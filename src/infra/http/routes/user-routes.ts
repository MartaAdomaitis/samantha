import { FastifyInstance } from "fastify";
import UserController, {
    GetUserParams,
    CreateUserBody,
    UpdateUserBody,
    LoginBody,
  } from "../controllers/user-controller";
import AuthenticationMiddleware from "../middlewares/authentication";

async function userRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: LoginBody }>(
    "/users/login", 
    async (request, response) => {
    return new UserController().login(request, response);
  });
  
  fastify.get<{ Params: GetUserParams }>(
    "/users/:id",
    { preHandler: AuthenticationMiddleware },
    async (request, response) => {
      return new UserController().get(request, response);
    },
  );

  fastify.get<{ Params: GetUserParams }>(
    "/users",
    { preHandler: AuthenticationMiddleware },
    async (request, response) => {
      return new UserController().getAll(request, response);
    },
  );

  fastify.post<{ Body: CreateUserBody }>(
    "/users", 
    async (request, response) => {
    return new UserController().create(request, response);
  });
  
  fastify.put<{ Body: UpdateUserBody, Params: {id: string} }>(
    "/users/:id", 
    { preHandler: AuthenticationMiddleware },
    async (request, response) => {
    return new UserController().update(request, response);
  });
  
  fastify.delete<{ Params: { id: string } }>(
    "/users/:id", 
    { preHandler: AuthenticationMiddleware }, 
    async (request, response) => {
    return new UserController().delete(request, response);
  });
}

export default userRoutes