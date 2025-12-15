import { Elysia } from "elysia";

const DEFAULT_PORT = 3000;

const port = process.env.PORT ?? DEFAULT_PORT;

const app = new Elysia().get("/", () => "Hello Elysia").listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
