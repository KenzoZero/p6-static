![Picosix](./document/static/logo.png)

# p6-static

> Serve an image at different size / resolution depending on user request

Description: updating ...

## Learning on this project

0. [Idea](./document/0-idea.md) 
1. [Build API server with ExpressJS](./document/1-build-api-server-with-expressjs.md)
2. Upload image with [multer](https://github.com/expressjs/multer)
3. Save image information with [lowdb](https://github.com/typicode/lowdb)
4. Render image with NodeJS Stream [File System](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
5. Resize and render image with [sharp](https://github.com/lovell/sharp)
6. Embedded watermark with [sharp](https://github.com/lovell/sharp)
7. Write log with [winston](https://github.com/winstonjs/winston)
8. Write test case
9. Dockerized your app
10. Refactor your app structure

## Contributors

Updating ...

## Installing / Getting started

### Quick start

1. Clone project

  - Using SSH `git clone git@github.com:picosix/p6-static.git`
  - Using HTTPS: `git clone https://github.com/picosix/p6-static.git`

2. Build docker images

  - Node `$ docker build --force-rm -t picosix/node -f docker/p6-node $(pwd)/docker`
  - Nginx `$ docker build --force-rm -t picosix/nginx -f docker/p6-nginx $(pwd)/docker`

3. Run docker containers

  - Nginx proxy `$ docker run -d --restart always --name nginx-proxy -p 80:80 -p 443:443 -v $(pwd)/certs:/etc/nginx/certs -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy`
  - Node app `$ docker run -d -e VIRTUAL_HOST=static.picosix.local --restart always --name p6-static-node -v $(pwd):/app picosix/node yarn start-dev`
  - Nginx server `$ docker run -d -e VIRTUAL_HOST=static.picosix.local --restart always --name p6-static-nginx -v $(pwd)/docker/nginx:/etc/nginx/conf.d/ -v $(pwd):/app --link p6-static-node:p6_static_node picosix/nginx`

## Developing

### Built With

- NodeJS v9.3.0
- ExpressJS v4.16.2
- SharpJS v0.18.4
- Lowdb v1.0.0

### Prerequisites

- Docker v17 or higher
- NodeJS v9 or higher

### Deploying / Publishing

Updating ...

## Versioning

`0.0.1`

## Configuration

Updating ...

## Style guide

We use [airbnb](https://github.com/airbnb/javascript) style and [prettier](https://github.com/prettier/prettier) to format code

## Api Reference

Updating ...

## Database

- [Lowdb](https://github.com/typicode/lowdb) v1.0.0

## Licensing

MIT License

Copyright (c) 2017 PicoSix

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.




