import CreateMessageUseCase from "../../../application/use-cases/messages/create-message";
import MessageRepositoryFactory from "../../database/factories/message-repository-factory";
import UserRepositoryFactory from "../../database/factories/user-repository-factory";

export default class CreateMessageFactory {
  public make() {
    const createMessageUseCase = new CreateMessageUseCase(
      new MessageRepositoryFactory().make(),
      new UserRepositoryFactory().make()
    );
    return createMessageUseCase;
  }
}