import { AppDataSource } from "@core/data-source";
import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { COMMANDS } from "./ux/commands";
import { TelegramController } from "@controllers/telegram.controller";
import { UserService } from "./services/user.service";
import { User } from "./entities/User";
import { ru } from "./localization/ru";
import { Keyboard } from "./ux/keyboard";
import { url } from "inspector";

const telegramController = new TelegramController(new UserService(AppDataSource.getRepository(User)));
const keyboard = new Keyboard();

AppDataSource.initialize()
  .then(() => console.log("Database init"))
  .catch((error) => console.log(error));

export const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: { interval: 300, autoStart: true, params: { timeout: 10 } },
});
bot.setMyCommands(COMMANDS);

bot.onText(/\/start/, async (msg) => {
  const from = msg.chat.id;

  try {
    const findUser = await telegramController.findOne(msg);

    if (findUser) {
      await bot.sendMessage(from, ru["greeting"], { reply_markup: keyboard.mainMenu() });
    } else {
      await telegramController.createUser(msg);
    }
  } catch (error) {
    console.log(error);
  }
});

bot.on("message", async (msg) => {
  const text = msg.text;
  const from = msg.chat.id;

  switch (text) {
    case ru["weather"]:
      bot.sendMessage(from, await telegramController.getWeather(), { parse_mode: "HTML" });
      break;
    case ru["reading"]:
      await bot.sendPhoto(from, process.env.IMG_URI, { caption: ru["text"] });
      const url = new URL(process.env.FILE_URI).pathname.split(/\//);
      await bot.sendDocument(from, `https://docs.google.com/uc?export=download&id=${url[url.length - 2]}`);
      break;
    default:
      break;
  }
});
