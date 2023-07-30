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

  export UNIT=$(                                                         \
      docker run -d                                                      \
      --mount type=bind,src="$(pwd)/config/",dst=/docker-entrypoint.d/   \
      --mount type=bind,src="$(pwd)/log/unit.log",dst=/var/log/unit.log  \
      --mount type=bind,src="$(pwd)/state",dst=/var/lib/unit             \
      --mount type=bind,src="$(pwd)/www",dst=/www                     \
      -p 80:80  unit:1.30.0-node18                                     \
  )
```
```sh
export UNIT_CONFIG=$(cat config.json)
RUN echo $UNIT config.json /docker-entrypoint.d/config.json
``````
## Start Cloudflared

```sh

docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token ${CLOUDFLARE_TUNNEL}
# https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/
cloudflared tunnel login
cloudflared tunnel list
cloudflared tunnel create river
cloudflared tunnel route dns river lagom.page
cloudflared service install
sudo launchctl start com.cloudflare.cloudflared

sudo launchctl stop com.cloudflare.cloudflared
$ sudo launchctl start com.cloudflare.cloudflared

sudo cloudflared service install ${CLOUDFLARE_TUNNEL2}
docker run --rm -it docker.io/cloudflare/cloudflared:latest tunnel --hello-world
  With your certificate installed you can then get started with Tunnels:
   
     $ cloudflared tunnel create my-first-tunnel
     $ cloudflared tunnel route dns my-first-tunnel my-first-tunnel.mydomain.com
     $ cloudflared tunnel run --hello-world my-first-tunnel
```
## Cloudflared quick tunnel 

```sh
cloudflared tunnel --url localhost:8080
```
## cloudflared named tunnel

## creating Named Tunnels

https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide


```sh
cloudflared tunnel login
# cloudflared tunnel create <TUNNEL_NAME> or <TUNNEL_UUID>
cloudflared tunnel create river
cloudflared tunnel route dns river river.lagom.page
```

## Unix socket path
`/var/run/control.unit.sock`

## Reconfigure
```

docker exec -i <contain_id> sh -c "curl -X PUT --data-binary @- --unix-socket /var/run/control.unit.sock http://localhost/config" < config.json

docker exec -i ba3737b060f7 sh -c "curl -X PUT --data-binary @- --unix-socket /var/run/control.unit.sock http://localhost/config" < config.json

docker exec -ti ba3737b060f7 curl --unix-socket /var/run/control.unit.sock http://localhost/config

```

## Build

Typescript files are built using [`tsconfig files`](https://www.typescriptlang.org/tsconfig#files) property.
- Add entry to every entry point [here](tsconfig.json#L103)
