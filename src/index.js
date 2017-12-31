const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const multer = require('multer');
const _ = require('lodash');
const slug = require('slug');
const shelljs = require('shelljs');
const uuid = require('uuid/v1');
const bluebird = require('bluebird');

const config = require('./config');
const { ensureFolderCache, resize, generateCacheUrl } = require('./p6Static');
const logger = require('./logger');
const dbConnection = require('./db');

const app = express();
// Midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// Routes
const packageJson = require('../package.json');
// Root
app.get('/', (req, res) =>
  res.json(
    _.pick(packageJson, ['name', 'version', 'description', 'author', 'license'])
  )
);

// Upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${config.folders.resource}`);
  },
  filename({ query = {} }, { originalname, mimetype }, cb) {
    const nameSegments = originalname.split('.');
    const name = slug(query.name ? query.name : nameSegments[0], {
      lower: true
    });

    const mineTypeSegments = mimetype.split('/');
    const ext = mineTypeSegments[1] || 'jpeg';
    cb(null, `${Date.now()}-${name}.${ext}`);
  }
});
const fileFilter = (req, { mimetype }, cb) =>
  cb(null, Boolean(config.allowTypes.indexOf(mimetype) > -1));
const upload = multer({ storage, fileFilter, limits: config.upload });
// Only allow upload with fields images
app.post('/upload', upload.array('images'), async ({ files, query }, res) => {
  const db = await dbConnection;

  const insertQueue = [];
  const images = [];
  _.each(files, ({ filename, path: imagePath, size }) => {
    // Insert image information to db
    insertQueue.push(
      db
        .get('resource')
        .push({
          id: uuid(),
          name: filename,
          path: imagePath,
          size
        })
        .write()
    );
    // Prepare image urls return to client
    images.push({
      name: filename,
      size: generateCacheUrl(
        filename,
        _.keys(config.sizes),
        query.pretier === '1' ? process.env.VIRTUAL_HOST : null
      )
    });
  });
  await bluebird.all(insertQueue);

  res.json({ images, host: process.env.VIRTUAL_HOST });
});

// Serve image
app.get('/image/:size/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { size = 'full' } = req.params;

    const imageStream = await resize(id, size, config);
    return imageStream.pipe(res);
  } catch (err) {
    return next(err);
  }
});

// Clear cache
app.delete('/cache', async (req, res) => {
  shelljs.rm('-rf', `${config.folders.cache}/*`);
  await ensureFolderCache(config.folders.cache, config.sizes);
  res.json({ sizes: config.sizes });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.message, { error: err });
  const message = config.debug
    ? err.message
    : 'An error encountered while processing images';
  res.status(500).json({ message });

  return next();
});

module.exports = app;
