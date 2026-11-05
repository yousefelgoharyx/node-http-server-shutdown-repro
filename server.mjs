import { createServer } from "node:http"
import * as NodeHttpServer from "@effect/platform-node/NodeHttpServer"
import * as NodeRuntime from "@effect/platform-node/NodeRuntime"
import { Effect, Layer } from "effect"
import { HttpRouter, HttpServerRequest, HttpServerResponse } from "effect/http"

const route = HttpRouter.add(
  "GET",
  "/ws",
  Effect.gen(function* () {
    const request = yield* HttpServerRequest.HttpServerRequest
    const socket = yield* request.upgrade
    yield* socket.reader
    yield* Effect.never
    return HttpServerResponse.empty()
  }),
)

const Server = HttpRouter.serve(route).pipe(
  Layer.provide(NodeHttpServer.layer(createServer, { host: "127.0.0.1", port: 8090 })),
)

NodeRuntime.runMain(Layer.launch(Server))
