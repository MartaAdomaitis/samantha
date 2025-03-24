import UserRepository from "../repositories/user-repository";

class UserRepositoryFactory {
  public make() {
    return new UserRepository();
  }
}

export default UserRepositoryFactory;
