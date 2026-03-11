import { IMessageRepository } from "../../../application/interfaces/i-message-repository";
import { PrismaClient } from "@prisma/client";
import { Message } from "../../../domain/entities/message";

const prisma = new PrismaClient();

export default class MessageRepository implements IMessageRepository {
  public async find(messageId: string): Promise<Message | null> {
    const message = await prisma.message.findFirst({ where: { id: messageId } });

    if (!message) {
      return null;
    }

    return message;
  }
  public async findAll(): Promise<Message[]> {
    const messages = await prisma.message.findMany();
    return Message.getAll(messages);
  }
  public async create(message: Message): Promise<void> {
    await prisma.message.create({ data: message });
  }
  public async update(message: Message): Promise<void> {
    await prisma.message.update({ where: { id: message.id }, data: message });
  }
  public async delete(messageId: string): Promise<void> {
    await prisma.message.delete({ where: { id: messageId } });
  }
}
