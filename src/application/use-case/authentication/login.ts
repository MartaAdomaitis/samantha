import { env } from "../../../infra/config/env";
import { IUserRepository } from "../../interfaces/i-user-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export default class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return {
      token: jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: "1h" }),
    };
  }
}