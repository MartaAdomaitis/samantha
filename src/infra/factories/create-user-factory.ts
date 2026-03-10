import CreateUserUseCase from "../../application/use-cases/users/create-user";
import UserRepositoryFactory from "../database/factories/user-repository-factory";
import BcryptHashProvider from "../providers/hash/bcrypt-hash-provider";

export default class CreateUserFactory {
  public make() {
    const createUserUseCase = new CreateUserUseCase(
      new UserRepositoryFactory().make(),
      new BcryptHashProvider(),
    );
    return createUserUseCase;
  }
}
