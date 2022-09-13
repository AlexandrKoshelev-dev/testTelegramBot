import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "@core/types";
import { User } from "@entities/User";
import { Message } from "node-telegram-bot-api";

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: Repository<User>) {}

  getAllUsers() {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  getOneByTelegramId(telegram_id: number) {
    try {
      return this.userRepository.findOneBy({ telegram_id });
    } catch (error) {
      console.log(error);
    }
  }

  createUser(userData: Message) {
    try {
      return this.userRepository.save({ telegram_id: +userData.from.id, ...userData.from });
    } catch (error) {
      console.log(error);
    }
  }

  updateMessage(telegram_id: number, message: string) {
    try {
      return this.userRepository.update({ telegram_id }, { message });
    } catch (error) {
      console.log(error);
    }
  }
}
