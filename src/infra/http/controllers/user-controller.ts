import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../../domain/entities/user";
import GetUserFactory from "../../factories/get-user-factory";
import CreateUserFactory from "../../factories/create-user-factory";
import UpdateUserFactory from "../../factories/update-user-factory";
import DeleteUserFactory from "../../factories/delete-user-factory";
import GetAllUserFactory from "../../factories/get-all-user-factory";
import LoginFactory from "../../factories/login-factory";

export interface ILoginBody {
  email: string;
  password: string;
}
export interface IGetUserParams {
  id: string;
}

export interface ICreateUserBody {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUserBody {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default class UserController {
  public async login(request: FastifyRequest<{ Body: ILoginBody }>, response: FastifyReply): Promise<void> {
    try {
      const body = request.body;
      const loginUseCase = new LoginFactory().make();
      const token = await loginUseCase.execute(body.email, body.password);
      return response.status(200).send(token);
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  public async get(
    request: FastifyRequest<{ Params: IGetUserParams }>,
    response: FastifyReply,
  ): Promise<User> {
    try {
      const userId = request.params.id;

      const getUserUseCase = new GetUserFactory().make();
      const user = await getUserUseCase.execute(userId);

      return response.status(200).send({ name: user?.name, email: user?.email });
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  public async getAll(
    _request: FastifyRequest,
    response: FastifyReply,
  ): Promise<void> {
    try {
      const getAllUserUseCase = new GetAllUserFactory().make();
      const users = await getAllUserUseCase.execute();
      return response.status(200).send(users);
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  public async create(
    request: FastifyRequest<{ Body: ICreateUserBody }>,
    response: FastifyReply,
  ): Promise<void> {
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

  public async update(
    request: FastifyRequest<{ Body: IUpdateUserBody, Params: {id: string} }>,
    response: FastifyReply,
  ): Promise<void> {
    try {
      const body = request.body;
      const userId = request.params.id;

      if (!body.name || !body.email || !body.password) {
        throw Error("Missing user update params");
      }

      const updateUserUseCase = new UpdateUserFactory().make();
      await updateUserUseCase.execute({...body, id: userId});

      return response.status(200).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  public async delete(
    request: FastifyRequest<{ Params: {id: string} }>,
    response: FastifyReply,
  ): Promise<void> {
    try {
      const userId = request.params.id;

      const deleteUserUseCase = new DeleteUserFactory().make();
      await deleteUserUseCase.execute(userId);

      return response.status(200).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
