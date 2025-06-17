import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../interfaces/i-user-repository";
import bcrypt from "bcrypt";
import { env } from "../../../infra/config/env";

export type Input = {
  name: string;
  email: string;
  password: string;
};

export default class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: Input): Promise<void> {
      const userExist = await this.userRepository.findByEmail(user.email);

      if (userExist) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(user.password, env.BCRYPT_SALT_ROUNDS);
  
      await this.userRepository.create(
        User.create(user.name, user.email, hashedPassword),
      );
  }
}
