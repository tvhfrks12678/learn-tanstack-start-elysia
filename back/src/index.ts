import { Effect, Schema } from "effect";
import { Elysia } from "elysia";

const DEFAULT_PORT = 3000;

const PortSchema = Schema.NumberFromString.pipe(
  Schema.int(),
  Schema.between(1, 65535),
)

const rawPort = process.env.PORT;

const portEffect = rawPort
  ? Schema.decode(PortSchema)(rawPort)
  : Effect.succeed(DEFAULT_PORT);

const port = Effect.runSync(portEffect)
// const port = process.env.PORT ?? DEFAULT_PORT;

const app = new Elysia().get("/", () => "Hello Elysia").listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

