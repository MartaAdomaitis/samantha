import { Message } from "../../domain/entities/message";

export interface IMessageRepository {
  find(messageId: string): Promise<Message | null>;
  findAll(): Promise<Message[]>;
  create(message: Message): Promise<void>;
  update(message: Message): Promise<void>;
  delete(messageId: string): Promise<void>;
}
