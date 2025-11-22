import { IUserRepository } from "../../interfaces/i-user-repository";

export default class GetAllUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute() {
    const users= await this.userRepository.findAll();
    return users;
  }
}
