import { IUserRepository } from "../../interfaces/i-user-repository";

export default class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string) {
    const user = await this.userRepository.delete(id);
    return user;
  }
}
