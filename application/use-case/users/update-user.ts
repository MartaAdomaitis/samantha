import { User } from "@prisma/client";
import { IUserRepository } from "../../interfaces/i-user-repository";

export default class UpdateUser {
  constructor(private userRepository: IUserRepository) {}

  public async execute(user: User): Promise<void> {
    try {
      const userExist = await this.userRepository.findByEmail(user.email);

      if (!userExist) {
        throw Error("User does not exists");
      }

      await this.userRepository.update(user);
    } catch (error) {
      console.log(error);
    }
  }
}
