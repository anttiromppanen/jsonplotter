import chalk from "chalk";

export function chalkColorByJsType(text: string, type: string) {
  switch (type) {
    case "string":
      return chalk.bgBlack.yellow(text);
    case "number":
      return chalk.bgBlack.cyan(text);
    case "boolean":
      return chalk.bgBlack.red(text);
    case "object":
      return chalk.bgBlack.magentaBright(text);
    case "Array":
      return chalk.bgBlack.green(text);
    default:
      return chalk.bgBlack.white(text);
  }
}
