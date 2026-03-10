import UpdateUserUseCase from "../../application/use-cases/users/update-user";
import UserRepositoryFactory from "../database/factories/user-repository-factory";
import BcryptHashProvider from "../providers/hash/bcrypt-hash-provider";

export default class UpdateUserFactory {
  public make() {
    const updateUserUseCase = new UpdateUserUseCase(
      new UserRepositoryFactory().make(),
      new BcryptHashProvider(),
    );
    return updateUserUseCase;
  }
}
