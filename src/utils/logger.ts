/* eslint-disable no-console */
import chalk from "chalk";

export function logger(message: string) {
  console.log("\n" + message + "\n");
}

export function errorLogger(message: string) {
  console.error("\n" + chalk.bold.red("Error: ") + message + "\n");
}
