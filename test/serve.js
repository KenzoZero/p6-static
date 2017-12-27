const fs = require('fs');
const crypto = require('crypto');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('..');
const config = require('../src/config');

const { assert } = chai;
chai.use(chaiHttp);

describe('Serve image with full size', () => {
  let server;
  let fileName;

  before(async () => {
    server = chai.request(app);

    const { body } = await server
      .post('/upload')
      .attach(
        'images',
        fs.readFileSync(`${__dirname}/SuperWoman.jpg`),
        'SuperWoman.jpg'
      );
    fileName = body.files[0].filename;
  });

  it('should return image binary', async () => {
    const { status, text } = await server.get(`/images/${fileName}`);
    // Assert
    assert.equal(status, 200);
    return new Promise((resolve, reject) =>
      fs.readFile(
        `${config.folders.cache}/full/${fileName}`,
        'utf8',
        (err, data) => {
          if (err) return reject(err);

          assert.equal(
            crypto
              .createHash('md5')
              .update(text)
              .digest('hex'),

            crypto
              .createHash('md5')
              .update(data)
              .digest('hex')
          );

          return resolve(true);
        }
      )
    );
  });
});