import { errorLogger } from "../utils/logger";
import {
  extractDataToVisualize,
  printDataAsTable,
  printDataInformation,
} from "../utils/printTableUtils";
import { validateUrl } from "../utils/validators";

export async function handleApiCall(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function handleUrlOption(url: string, limit?: number) {
  if (!validateUrl(url))
    return errorLogger("Invalid URL. Please provide a valid URL.");

  const jsonData = await handleApiCall(url);
  const dataToVisualize = extractDataToVisualize(jsonData);
  printDataAsTable(dataToVisualize, limit);
  printDataInformation(dataToVisualize);
  console.log("");
}
