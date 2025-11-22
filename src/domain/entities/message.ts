import { randomUUID } from "node:crypto";

export interface IMessage{
  id: string,
  userId: string,
  body: string,
  senderType: "bot" | "user",
  updatedAt: Date,
  createdAt?: Date,
  deletedAt?: Date | null,
}

export class Message {
  constructor(
    public id: string,
    public userId: string,
    public body: string,
    public senderType: "bot" | "user",
    public updatedAt: Date,
    public createdAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  static create({userId, body, senderType}: IMessage) {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date(); 
    const deletedAt = null;

    return new Message(id, userId, body, senderType, createdAt, updatedAt, deletedAt);
  }

  static update({id, userId, body, senderType}: IMessage) {
    const updatedAt = new Date();

    return new Message(id, userId, body, senderType, updatedAt);
  }
}
