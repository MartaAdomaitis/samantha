import { Token } from "../../../domain/entities/token";
import { env } from "../../../infra/config/env";
import { ITokenRepository } from "../../interfaces/i-token-repository";
import { IUserRepository } from "../../interfaces/i-user-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export default class LoginUseCase {
  constructor(private userRepository: IUserRepository, private tokenRepository: ITokenRepository) {}

  public async execute(email: string, password: string): Promise<Token> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: "1h" });
    await this.tokenRepository.create({ userId: user.id, token });
    return Token.create({ userId: user.id, token });
  }
}