import { User } from "../../domain/entities/user";

export interface IUserRepository {
  find(userId: string): Promise<User | null>;
  findAll(): Promise<{
  id: string;
  email: string;
  name: string;
}[]>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(userId: string): Promise<void>;
}
