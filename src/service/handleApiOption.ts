import { errorLogger } from "../utils/logger";
import {
  extractDataToVisualize,
  printDataAsTable,
  printDataInformation,
} from "../utils/printTableUtils";
import { validateUrl } from "../utils/validators";

export async function handleApiCall(url: string) {
  const yoctoSpinner = await import("yocto-spinner").then((mod) => mod.default);
  const spinner = yoctoSpinner({ text: "Loading data from api…" }).start();

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    errorLogger(`Fetch error: ${(error as Error).message}`);
    throw error; // Re-throw the error to handle it later
  } finally {
    spinner.stop();
  }
}

export async function handleUrlOption(url: string, limit?: number) {
  if (!validateUrl(url))
    return errorLogger("Invalid URL. Please provide a valid URL.");

  try {
    const jsonData = await handleApiCall(url);
    const dataToVisualize = extractDataToVisualize(jsonData);
    printDataAsTable(dataToVisualize, limit);
    printDataInformation(dataToVisualize);
    console.log("");
  } catch (error) {
    errorLogger(`${(error as Error).message}`);
  }
}
