import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from "node-telegram-bot-api";
import { ru } from "../localization/ru";

export class Keyboard {
  mainMenu(): ReplyKeyboardMarkup {
    return {
      keyboard: [[{ text: ru["weather"] }], [{ text: ru["reading"] }], [{ text: ru["spam"] }]],
      resize_keyboard: true,
    };
  }

  agree(): InlineKeyboardMarkup {
    return {
      inline_keyboard: [
        [
          { text: ru["yes"], callback_data: "YES" },
          { text: ru["cancel"], callback_data: "CANCEL" },
        ],
      ],
    };
  }
}
