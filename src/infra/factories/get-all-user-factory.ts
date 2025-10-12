import GetAllUserUseCase from "../../application/use-case/users/get-all-user";
import UserRepositoryFactory from "../database/factories/user-repository-factory";

export default class GetAllUserFactory {
  public make() {
    const getAllUserUseCase = new GetAllUserUseCase(
      new UserRepositoryFactory().make(),
    );
    return getAllUserUseCase;
  }
}
