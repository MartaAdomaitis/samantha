import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../interfaces/i-user-repository";
import { IHashProvider } from "../../providers/i-hash-provider";

export type Input = {
  name: string;
  email: string;
  password: string;
};

export default class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute(user: Input): Promise<void> {
      const userExist = await this.userRepository.findByEmail(user.email);

      if (userExist) {
        throw new Error("User already exists");
      }

      const hashedPassword = await this.hashProvider.hash(user.password)  

      await this.userRepository.create(
        User.create(user.name, user.email, hashedPassword),
      );
  }
}
