
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../interfaces/i-user-repository";

export default class UpdateUserUseCase {
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
