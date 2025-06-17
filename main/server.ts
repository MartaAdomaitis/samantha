import fastify from "fastify";
import UserController, {
  GetUserParams,
  CreateUserBody,
  UpdateUserBody,
} from "../src/infra/controllers/user-controller";

export const server = fastify();

server.get("/", (_request, response) => {
  return response.status(200).send("Server is ok!");
});

server.get<{ Params: GetUserParams }>(
  "/users/:id",
  async (request, response) => {
    return new UserController().get(request, response);
  },
);

server.post<{ Body: CreateUserBody }>("/users", async (request, response) => {
  return new UserController().create(request, response);
});

server.put<{ Body: UpdateUserBody, Params: {id: string} }>("/users/:id", async (request, response) => {
  return new UserController().update(request, response);
});

server.delete<{ Params: {id: string} }>("/users/:id", async (request, response) => {
  return new UserController().delete(request, response);
});

server.listen(
  {
    port: 3333,
  },
  () => {
    console.log("Server is running on port 3333");
  },
);
