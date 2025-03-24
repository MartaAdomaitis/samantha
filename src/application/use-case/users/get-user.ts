import { IUserRepository } from "../../interfaces/i-user-repository";

export default class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string) {
    const user = await this.userRepository.find(id);
    return user;
  }
}
