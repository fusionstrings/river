FROM unit:1.30.0-minimal
COPY ./.secret/*.pem  /docker-entrypoint.d/
COPY ./config/*.json /docker-entrypoint.d/
COPY ./scripts/*.sh   /docker-entrypoint.d/
