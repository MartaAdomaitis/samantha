import { Message } from "../../../domain/entities/message";
import { IMessageRepository } from "../../interfaces/i-message-repository";
import { IUserRepository } from "../../interfaces/i-user-repository";

export type Input = {
    userId: string;
    body: string;
    senderType: string;
}
export default class CreateMessage {
    constructor(
      private messageRepository: IMessageRepository,
      private userRepository: IUserRepository,
    ){}

    public async execute(message: Input): Promise<void>{
        const user = await this.userRepository.find(message.userId);

        if (!user) {
          throw new Error("User does not exists");
        }
  
        await this.messageRepository.create(
            Message.create(message.userId, message.body, message.senderType),
          );

    }
}