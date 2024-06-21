FROM jsii/superchain:1-bookworm-slim

WORKDIR /app

ARG BUILD_ARGS

COPY . .

RUN yarn install && yarn build ${BUILD_ARGS}

