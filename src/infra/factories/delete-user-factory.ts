import DeleteUserUseCase from "../../application/use-case/users/delete-user";
import UserRepositoryFactory from "../database/factories/user-repository-factory";

export default class DeleteUserFactory {
  public make() {
    const deleteUserUseCase = new DeleteUserUseCase(
      new UserRepositoryFactory().make(),
    );
    return deleteUserUseCase;
  }
}
