import fastify from "fastify";
import userRoutes from "../src/infra/http/routes/user-routes";
import { env } from "../src/infra/config/env"

export const server = fastify();

server.get("/", (_request, response) => {
  return response.status(200).send("Server is ok!");
});

server.register(userRoutes);

server.listen(
  {
    port: env.PORT,
  },
  () => {
    console.log(`Server is running on port ${env.PORT}`);
  },
);
