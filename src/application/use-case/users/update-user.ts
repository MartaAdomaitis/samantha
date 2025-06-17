
import { User } from "../../../domain/entities/user";
import { env } from "../../../infra/config/env";
import { IUserRepository } from "../../interfaces/i-user-repository";
import bcrypt from "bcrypt";

export default class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: User): Promise<void> {
      const userExist = await this.userRepository.findByEmail(user.email);

      if (!userExist) {
        throw new Error("User does not exists");
      }

      const hashedPassword = await bcrypt.hash(user.password, env.BCRYPT_SALT_ROUNDS);

      await this.userRepository.update(User.update(user.id, user.name, user.email, hashedPassword));
  }
}
