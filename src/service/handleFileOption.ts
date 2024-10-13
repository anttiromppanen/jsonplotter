import * as fs from "fs";
import * as path from "path";
import {
  extractDataToVisualize,
  printDataAsTable,
  printDataInformation,
} from "../utils/printTableUtils";
import { validateFilepath } from "../utils/validators";
import { errorLogger } from "../utils/logger";

function readFile(filepath: string) {
  return new Promise((resolve, reject) => {
    // Specify the file path
    const filePathResolved = path.resolve(process.cwd(), filepath);

    // Read and parse the JSON file
    fs.readFile(filePathResolved, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return reject(err);
      }

      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        reject(err);
      }
    });
  });
}

export async function handleFileOption(filepath: string, limit?: number) {
  if (!validateFilepath(filepath))
    return errorLogger(
      "Invalid file path. Please provide a valid file path for a JSON file.",
    );

  try {
    const jsonData = await readFile(filepath);
    const dataToVisualize = extractDataToVisualize(jsonData);
    printDataAsTable(dataToVisualize, limit);
    printDataInformation(dataToVisualize);
    console.log("");
  } catch (error) {
    console.error("Failed to handle file option:", error);
  }
}
