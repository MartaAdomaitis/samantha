import CreateUserUseCase from "../../application/use-case/users/create-user";
import UserRepositoryFactory from "../database/factories/user-repository-factory";

export default class CreateUserFactory {
  public make() {
    const createUserUseCase = new CreateUserUseCase(
      new UserRepositoryFactory().make(),
    );
    return createUserUseCase;
  }
}
