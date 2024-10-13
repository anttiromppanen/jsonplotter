#!/bin/env node

import { Command } from "commander";
import { handleApiCall, handleUrlOption } from "./service/handleApiOption";
import { handleFileOption } from "./service/handleFileOption";
import { errorLogger } from "./utils/logger";

const program = new Command();

function main() {
  program
    .name("jsonplotter")
    .description("A CLI tool to get an overview of JSON-data in terminal.")
    .version("1.0.0");

  program
    .command("plot")
    .option("-f, --file <file>", "Path to JSON file")
    .option("-u, --url <url>", "URL to JSON api")
    .option(
      "-l, --limit <limit>",
      "Limit the number of rows to display, defaults to 3",
    )
    .action(async (options) => {
      if (options.url && options.file) {
        errorLogger("Please provide either a file or a url, not both.");
        process.exit(1);
      }
      if (options.url) {
        await handleUrlOption(options.url, options.limit);
      }
      if (options.file) {
        await handleFileOption(options.file, options.limit);
      }
    });

  program.parse();
}

main();
