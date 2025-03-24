import UpdateUserUseCase from "../../application/use-case/users/update-user";
import UserRepositoryFactory from "../database/factories/user-repository-factory";

export default class UpdateUserFactory {
  public make() {
    const updateUserUseCase = new UpdateUserUseCase(
      new UserRepositoryFactory().make(),
    );
    return updateUserUseCase;
  }
}
