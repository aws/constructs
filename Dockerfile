FROM jsii/superchain:1-bookworm-slim-node18

WORKDIR /app

ARG BUILD_ARGS

COPY --chown=1001:1001 . .

RUN yarn install && yarn build ${BUILD_ARGS}

