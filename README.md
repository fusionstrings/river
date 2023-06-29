# River Architecture

- Origin Server
  - Nginx Unit

## [Start Nginx Unit](https://unit.nginx.org/howto/docker/)


```sh

  export UNIT=$(                                                         \
      docker run -d                                                      \
      --mount type=bind,src="$(pwd)/config/",dst=/docker-entrypoint.d/   \
      --mount type=bind,src="$(pwd)/log/unit.log",dst=/var/log/unit.log  \
      --mount type=bind,src="$(pwd)/state",dst=/var/lib/unit             \
      --mount type=bind,src="$(pwd)/www",dst=/www                     \
      -p 80:80  unit:1.30.0-minimal                                           \
  )
```

## Start Cloudflared

```sh

docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token ${CLOUDFLARE_TUNNEL}

```

## Unix socket path
`/var/run/control.unit.sock`

## Reconfigure
```

docker exec -i <contain_id> sh -c "curl -X PUT --data-binary @- --unix-socket /var/run/control.unit.sock http://localhost/config" < config.json

```