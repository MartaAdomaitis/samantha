import { FastifyInstance } from "fastify";
import UserController, {
    GetUserParams,
    CreateUserBody,
    UpdateUserBody,
  } from "../controllers/user-controller";

async function userRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: GetUserParams }>(
    "/users/:id",
    async (request, response) => {
      return new UserController().get(request, response);
    },
  );
  
  fastify.post<{ Body: CreateUserBody }>("/users", async (request, response) => {
    return new UserController().create(request, response);
  });
  
  fastify.put<{ Body: UpdateUserBody, Params: {id: string} }>("/users/:id", async (request, response) => {
    return new UserController().update(request, response);
  });
  
  fastify.delete<{ Params: {id: string} }>("/users/:id", async (request, response) => {
    return new UserController().delete(request, response);
  });
}

export default userRoutes