import MessageRepository from "../repositories/message-repository";

class MessageRepositoryFactory {
  public make() {
    return new MessageRepository();
  }
}

export default MessageRepositoryFactory;
