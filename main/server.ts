import fastify from "fastify";
import UserController, {
  GetUserParams,
  CreateUserBody,
} from "../src/infra/controllers/user-controller";

export const server = fastify();

server.get("/", (_request, response) => {
  return response.status(200).send("Server is ok!");
});

server.get<{ Params: GetUserParams }>(
  "/users/:id",
  async (request, response) => {
    return new UserController().getUser(request, response);
  },
);

server.post<{ Body: CreateUserBody }>("/users", async (request, response) => {
  return new UserController().createUser(request, response);
});

server.put("/users/:id", () => {
  return "Server is up";
});

server.delete("/users/:id", () => {
  return "Server is up";
});

server.listen(
  {
    port: 3333,
  },
  () => {
    console.log("Server is running on port 3333");
  },
);
