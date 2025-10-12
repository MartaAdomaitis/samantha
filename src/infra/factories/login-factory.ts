import LoginUseCase from "../../application/use-case/authentication/login";
import UserRepositoryFactory from "../database/factories/user-repository-factory";

export default class LoginFactory {
  public make() {
    const loginUseCase = new LoginUseCase(
      new UserRepositoryFactory().make(),
    );
    return loginUseCase;
  }
}
