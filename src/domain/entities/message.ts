import { randomUUID } from "node:crypto";

export interface IMessage{
  id: string,
  userId: string,
  body: string,
  senderType: string,
  updatedAt: Date,
  createdAt?: Date,
  deletedAt?: Date | null,
}

export class Message {
  constructor(
    public id: string,
    public userId: string,
    public body: string,
    public senderType: string,
    public updatedAt: Date,
    public createdAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  static create(userId: string, body: string, senderType: string) {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date(); 
    const deletedAt = null;

    return new Message(id, userId, body, senderType, updatedAt, createdAt, deletedAt);
  }

  static update(id: string, userId: string, body: string, senderType: string) {
    const updatedAt = new Date();

    return new Message(id, userId, body, senderType, updatedAt);
  }

  static getAll(data:IMessage[]) {
    const users = [];
    for (const user of data) {
      users.push(user);
    }
    return users;
  } 
}
