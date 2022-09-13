import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "../core/types";
import { User } from "../entities/User";

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: Repository<User>) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }
}
