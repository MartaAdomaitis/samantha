import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../interfaces/i-user-repository";

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
      throw Error("User already exists");
    }

    await this.userRepository.create(
      User.create(user.name, user.email, user.password),
    );
  }
}
