import { IUserRepository } from "../../interfaces/i-user-repository";

export default class DeleteUser {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string) {
    const user = await this.userRepository.delete(id);
    return user;
  }
}
