import { FastifyInstance } from "fastify";
import MessageController, {
    // IGetMessageParams,
    ICreateMessageBody,
    // IUpdateMessageBody
  } from "../controllers/message-controller";
import AuthenticationMiddleware from "../middlewares/authentication";

async function messageRoutes(fastify: FastifyInstance) {
  // fastify.get<{ Params: IGetMessageParams }>(
  //   "/messages/:id",
  //   { preHandler: AuthenticationMiddleware },
  //   async (request, response) => {
  //     return new MessageController().get(request, response);
  //   },
  // );

  // fastify.get<{ Params: IGetMessageParams }>(
  //   "/messages",
  //   { preHandler: AuthenticationMiddleware },
  //   async (request, response) => {
  //     return new MessageController().getAll(request, response);
  //   },
  // );

  fastify.post<{ Body: ICreateMessageBody }>(
    "/messages", 
    { preHandler: AuthenticationMiddleware },
    async (request, response) => {
    return new MessageController().create(request, response);
  });
  
  // fastify.put<{ Body: IUpdateMessageBody, Params: {id: string} }>(
  //   "/messages/:id", 
  //   { preHandler: AuthenticationMiddleware },
  //   async (request, response) => {
  //   return new MessageController().update(request, response);
  // });
  
  // fastify.delete<{ Params: { id: string } }>(
  //   "/messages/:id", 
  //   { preHandler: AuthenticationMiddleware }, 
  //   async (request, response) => {
  //   return new MessageController().delete(request, response);
  // });
}

export default messageRoutes