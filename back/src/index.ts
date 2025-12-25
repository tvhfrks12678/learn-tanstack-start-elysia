import { Effect, Schema, Option } from "effect";
import { Elysia } from "elysia";

const DEFAULT_PORT = 3000;

const PortSchema = Schema.NumberFromString.pipe(
  Schema.int(),
  Schema.between(1, 65535),
)

const getPort = Effect.gen(function* () {
  const rawPort = Option.fromNullable(process.env.PORT)

  return yield* Option.match(rawPort, {
    onNone: () => Effect.succeed(DEFAULT_PORT),
    onSome: (value) => Schema.decode(PortSchema)(value),
  })
})

const port = Effect.runSync(getPort)

// const portEffect = Option.fromNullable(process.env.PORT).pipe(
//   Option.match({
//     onNone: () => Effect.succeed(DEFAULT_PORT),
//     onSome: (value) => Schema.decodeUnknown(PortSchema)(value),
//   })
// );

// const port = Effect.runSync(portEffect)

// const rawPort = process.env.PORT;

// const portEffect = rawPort
//   ? Schema.decode(PortSchema)(rawPort)
//   : Effect.succeed(DEFAULT_PORT);

// const port = Effect.runSync(portEffect)
// const port = process.env.PORT ?? DEFAULT_PORT;

const app = new Elysia().get("/", () => "Hello Elysia").listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

