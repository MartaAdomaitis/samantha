import { randomUUID } from "node:crypto";

export class Token {
  constructor(
    public id: string,
    public userId: string,
    public token: string,
  ) {}

  static create({userId, token}: {userId: string, token: string}): Token {
    const id = randomUUID();
    return new Token(id, userId, token);
  }

  static update({id, userId, token}: {id: string, userId: string, token: string}): Token {
    return new Token(id, userId, token);
  }

  static getAll(data: {id: string, userId: string, token: string}[]) {
    const tokens = [];
    for (const token of data) {
      tokens.push({ id: token.id, userId: token.userId, token: token.token });
    }
    return tokens;
  } 
}
