# p6-cdn

> Serve an image at different size / resolution depending on user request

## Build docker images

- nodejs

```shell
$ docker build --force-rm -t picosix/node -f docker/p6-node ./docker
```

## Run docker service

```shell
$ docker run -d -p 80:80 -p 443:443 -v $(pwd)/../certs:/etc/nginx/certs -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
$ docker run -e VIRTUAL_HOST=static.picosix.com -d  --restart always --name p6_static -v $(pwd):/app picosix/node yarn start-dev
```