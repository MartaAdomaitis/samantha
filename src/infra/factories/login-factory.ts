import LoginUseCase from "../../application/use-cases/authentication/login";
import TokenRepositoryFactory from "../database/factories/token-repository-factory";
import UserRepositoryFactory from "../database/factories/user-repository-factory";
import BcryptHashProvider from "../providers/hash/bcrypt-hash-provider";
import JwtProvider from "../providers/token/jwt-token-provider";

export default class LoginFactory {
  public make() {
    const loginUseCase = new LoginUseCase(
      new UserRepositoryFactory().make(),
      new TokenRepositoryFactory().make(),
      new BcryptHashProvider(),
      new JwtProvider()
    );
    return loginUseCase;
  }
}
