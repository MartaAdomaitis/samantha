import { User } from "@prisma/client";
import { IUserRepository } from "../../interfaces/i-user-repository";

export default class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: User): Promise<void> {
    const userExist = await this.userRepository.findByEmail(user.email);

    if (userExist) {
      throw Error("User already exists");
    }

    await this.userRepository.create(user);
  }
}
