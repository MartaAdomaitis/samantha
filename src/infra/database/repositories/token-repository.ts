import { ITokenRepository } from "../../../application/interfaces/i-token-repository";
import { PrismaClient } from "@prisma/client";
import { Token } from "../../../domain/entities/token";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

export default class TokenRepository implements ITokenRepository {
  public async find(tokenId: string): Promise<Token | null> {
    const token = await prisma.token.findFirst({ where: { id: tokenId } });

    if (!token) {
      return null;
    }

    return token;
  }
  public async findAll(): Promise<{
    id: string;
    userId: string;
    token: string;
}[]> {
    const tokens = await prisma.token.findMany();
    return Token.getAll(tokens);
  }
  public async create({userId, token}: {userId: string, token: string}): Promise<void> {
    await prisma.token.create({ data: { id: randomUUID(), userId, token } });
  }
  public async update({id, token}: {id: string, token: string}): Promise<void> {
    await prisma.token.update({ where: { id }, data: { token } });
  }
}
