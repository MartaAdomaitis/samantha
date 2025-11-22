import LoginUseCase from "../../application/use-cases/authentication/login";
import TokenRepositoryFactory from "../database/factories/token-repository-factory";
import UserRepositoryFactory from "../database/factories/user-repository-factory";

export default class LoginFactory {
  public make() {
    const loginUseCase = new LoginUseCase(
      new UserRepositoryFactory().make(),
      new TokenRepositoryFactory().make(),
    );
    return loginUseCase;
  }
}
