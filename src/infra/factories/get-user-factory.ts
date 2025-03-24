import GetUserUseCase from "../../application/use-case/users/get-user";
import UserRepositoryFactory from "../database/factories/user-repository-factory";

export default class GetUserFactory {
  public make() {
    const getUserUseCase = new GetUserUseCase(
      new UserRepositoryFactory().make(),
    );
    return getUserUseCase;
  }
}
