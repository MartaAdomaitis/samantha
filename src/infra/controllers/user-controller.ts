import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../domain/entities/user";
import GetUserFactory from "../factories/get-user-factory";
import CreateUserFactory from "../factories/create-user-factory";

export interface GetUserParams {
  id: string;
}

export interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}

export default class UserController {
  public async getUser(
    request: FastifyRequest<{ Params: GetUserParams }>,
    response: FastifyReply,
  ): Promise<User> {
    try {
      const userId = request.params.id;

      const getUserUseCase = new GetUserFactory().make();
      const user = await getUserUseCase.execute(userId);

      return response.status(200).send(user);
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  public async createUser(
    request: FastifyRequest<{ Body: CreateUserBody }>,
    response: FastifyReply,
  ): Promise<User> {
    try {
      const body = request.body;

      if (!body.name || !body.email || !body.password) {
        throw Error("Missing user creation params");
      }

      const createUserUseCase = new CreateUserFactory().make();
      await createUserUseCase.execute(body);

      return response.status(200).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
