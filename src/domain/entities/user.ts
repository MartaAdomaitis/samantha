import { randomUUID } from "node:crypto";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static create(name: string, email: string, password: string): User {
    const id = randomUUID();
    return new User(id, name, email, password);
  }

  static update(id: string, name: string, email: string, password: string): User {
    return new User(id, name, email, password);
  }
}
