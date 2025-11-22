import UserRepository from "../../database/repositories/user-repository";

class UserRepositoryFactory {
  public make() {
    return new UserRepository();
  }
}

export default UserRepositoryFactory;
