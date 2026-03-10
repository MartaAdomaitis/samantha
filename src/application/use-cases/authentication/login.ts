import { Token } from "../../../domain/entities/token";
import { IHashProvider } from "../../providers/i-hash-provider";
import { ITokenRepository } from "../../interfaces/i-token-repository";
import { IUserRepository } from "../../interfaces/i-user-repository";
import { IJwtProvider } from "../../providers/i-jwt-provider";


export default class LoginUseCase {
  constructor(
    private userRepository: IUserRepository, 
    private tokenRepository: ITokenRepository,
    private hashProvider: IHashProvider,
    private jwtProvider: IJwtProvider
  ) {}

  public async execute(email: string, password: string): Promise<Token> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await this.hashProvider.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = await this.jwtProvider.create(user.id);

    await this.tokenRepository.create({ userId: user.id, token });

    return Token.create({ userId: user.id, token });
  }
}