import TokenRepository from "../../database/repositories/token-repository";

class TokenRepositoryFactory {
  public make() {
    return new TokenRepository();
  }
}

export default TokenRepositoryFactory;
