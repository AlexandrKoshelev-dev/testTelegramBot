import { AppDataSource } from "./data-source";
import { User } from "./entities/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("Database init");
  })
  .catch((error) => console.log(error));
