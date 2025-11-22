import { IMessage, Message } from "../../../domain/entities/message";
import { IMessageRepository } from "../../interfaces/i-message-repository";

export interface Input extends IMessage {}

export default class CreateMessage {
    constructor(private messageRepository: IMessageRepository){}

    public async execute(message: Input): Promise<void>{
        await this.messageRepository.create(
            Message.create(message),
          );

    }
}