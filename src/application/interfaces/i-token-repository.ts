import { Token } from "../../domain/entities/token";

export interface ITokenRepository {
  find(tokenId: string): Promise<Token | null>;
  findAll(): Promise<{
    id: string;
    userId: string;
    token: string;
}[]>;
  create({userId, token}: {userId: string, token: string}): Promise<void>;
  update({id, token}: {id: string, token: string}): Promise<void>;
}
