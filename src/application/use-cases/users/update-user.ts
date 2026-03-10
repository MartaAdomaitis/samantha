
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../interfaces/i-user-repository";
import { IHashProvider } from "../../providers/i-hash-provider";

export default class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute(user: User): Promise<void> {
      const userExist = await this.userRepository.find(user.id);

      if (!userExist) {
        throw new Error("User does not exists");
      }

      const hashedPassword = await this.hashProvider.hash(user.password);

      await this.userRepository.update(User.update(user.id, user.name, user.email, hashedPassword));
  }
}
