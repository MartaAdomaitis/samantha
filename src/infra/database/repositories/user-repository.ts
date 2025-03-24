import { IUserRepository } from "../../../application/interfaces/i-user-repository";
import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/entities/user";

const prisma = new PrismaClient();

export default class UserRepository implements IUserRepository {
  public async find(userId: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      return null;
    }

    return user;
  }
  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }
  public async create(user: User): Promise<void> {
    await prisma.user.create({ data: user });
  }
  public async update(user: User): Promise<void> {
    await prisma.user.update({ where: { id: user.id }, data: user });
  }
  public async delete(userId: string): Promise<void> {
    await prisma.user.delete({ where: { id: userId } });
  }
}
