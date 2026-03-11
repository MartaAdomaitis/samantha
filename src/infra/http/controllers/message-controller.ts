import { FastifyReply, FastifyRequest } from "fastify";
import { Message } from "../../../domain/entities/message";
// import GetMessageFactory from "../../factories/messages/get-message-factory";
import CreateMessageFactory from "../../factories/messages/create-message-factory";
// import UpdateMessageFactory from "../../factories/messages/update-message-factory";
// import DeleteMessageFactory from "../../factories/messages/delete-message-factory";
// import GetAllMessageFactory from "../../factories/messages/get-all-message-factory";

export interface IGetMessageParams {
  id: string;
}

export interface ICreateMessageBody {
  userId: string;
  body: string;
  senderType: string;
}

export interface IUpdateMessageBody {
  id: string;
  userId: string;
  body: string;
  senderType: string;
}

export default class MessageController {
  // public async get(
  //   request: FastifyRequest<{ Params: IGetMessageParams }>,
  //   response: FastifyReply,
  // ): Promise<Message> {
  //   try {
  //     const messageId = request.params.id;

  //     const getMessageUseCase = new GetMessageFactory().make();
  //     const message = await getMessageUseCase.execute(messageId);

  //     return response.status(200).send({ name: message?.name, email: message?.email });
  //   } catch (error) {
  //     return response.status(500).send(error);
  //   }
  // }

  // public async getAll(
  //   _request: FastifyRequest,
  //   response: FastifyReply,
  // ): Promise<void> {
  //   try {
  //     const getAllMessageUseCase = new GetAllMessageFactory().make();
  //     const messages = await getAllMessageUseCase.execute();
  //     return response.status(200).send(messages);
  //   } catch (error) {
  //     return response.status(500).send(error);
  //   }
  // }

  public async create(
    request: FastifyRequest<{ Body: ICreateMessageBody }>,
    response: FastifyReply,
  ): Promise<void> {
    try {
      const body = request.body;

      if (!body.userId || !body.body || !body.senderType) {
        throw Error("Missing message creation params");
      }

      const createMessageUseCase = new CreateMessageFactory().make();
      await createMessageUseCase.execute(body);

      return response.status(200).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  // public async update(
  //   request: FastifyRequest<{ Body: IUpdateMessageBody, Params: {id: string} }>,
  //   response: FastifyReply,
  // ): Promise<void> {
  //   try {
  //     const body = request.body;
  //     const messageId = request.params.id;

  //     if (!body.name || !body.email || !body.password) {
  //       throw Error("Missing message update params");
  //     }

  //     const updateMessageUseCase = new UpdateMessageFactory().make();
  //     await updateMessageUseCase.execute({...body, id: messageId});

  //     return response.status(200).send();
  //   } catch (error) {
  //     return response.status(500).send(error);
  //   }
  // }

  // public async delete(
  //   request: FastifyRequest<{ Params: {id: string} }>,
  //   response: FastifyReply,
  // ): Promise<void> {
  //   try {
  //     const messageId = request.params.id;

  //     const deleteMessageUseCase = new DeleteMessageFactory().make();
  //     await deleteMessageUseCase.execute(messageId);

  //     return response.status(200).send();
  //   } catch (error) {
  //     return response.status(500).send(error);
  //   }
  // }
}
