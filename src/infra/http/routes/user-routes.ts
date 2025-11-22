import { FastifyInstance } from "fastify";
import UserController, {
    IGetUserParams,
    ICreateUserBody,
    IUpdateUserBody,
    ILoginBody,
  } from "../controllers/user-controller";
import AuthenticationMiddleware from "../middlewares/authentication";

async function userRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ILoginBody }>(
    "/users/login", 
    async (request, response) => {
    return new UserController().login(request, response);
  });
  
  fastify.get<{ Params: IGetUserParams }>(
    "/users/:id",
    { preHandler: AuthenticationMiddleware },
    async (request, response) => {
      return new UserController().get(request, response);
    },
  );

  fastify.get<{ Params: IGetUserParams }>(
    "/users",
    { preHandler: AuthenticationMiddleware },
    async (request, response) => {
      return new UserController().getAll(request, response);
    },
  );

  fastify.post<{ Body: ICreateUserBody }>(
    "/users", 
    async (request, response) => {
    return new UserController().create(request, response);
  });
  
  fastify.put<{ Body: IUpdateUserBody, Params: {id: string} }>(
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