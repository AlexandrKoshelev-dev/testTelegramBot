import { ReplyKeyboardMarkup } from "node-telegram-bot-api";
import { ru } from "../localization/ru";

export class Keyboard {
  mainMenu(): ReplyKeyboardMarkup {
    return {
      keyboard: [[{ text: ru["weather"] }], [{ text: ru["reading"] }], [{ text: ru["spam"] }]],
      resize_keyboard: true,
    };
  }
}
