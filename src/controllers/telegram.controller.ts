import { TYPES } from "@/core/types";
import { UserService } from "@/services/user.service";
import { inject, injectable } from "inversify";
import { CallbackQuery, Message } from "node-telegram-bot-api";
import axios from "axios";
import "dotenv/config";
import { ru } from "@/localization/ru";
import { bot } from "..";

export class TelegramController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  createUser(msg: Message) {
    return this.userService.createUser(msg);
  }

  findOne(msg: Message) {
    return this.userService.getOneByTelegramId(msg.from.id);
  }

  async getWeather() {
    try {
      const { data } = await axios.get(
        process.env.URI + "q=" + process.env.CITY + "&lang=ru&units=metric&appid=" + process.env.API_KEY
      );
      return `<b>${ru["weather_in"] + " Канаде - " + data.weather[0].description}</b>
      ${ru["temp"] + ":"} <b>${data.main.temp + " " + ru["size"]}</b>
      ${ru["water"] + ":"} <b>${data.main.humidity} %</b>
      ${ru["wind"] + ":"} <b>${data.wind.speed + " " + ru["speed"]}</b>
      `;
    } catch (error) {
      console.log(error);
    }
  }

  async setMessageFlag(msg: CallbackQuery | Message, message?: string) {
    await this.userService.updateMessage(msg.from.id, message ? message : "");
  }

  async spam(message: string) {
    try {
      const users = await this.userService.getAllUsers();
      await Promise.all([
        users.forEach(async (user) => {
          try {
            await bot.sendMessage(user.telegram_id, message);
          } catch (error) {
            console.log(error);
          }
        }),
      ]);
      return users.length;
    } catch (error) {
      console.log(error);
    }
  }
}
