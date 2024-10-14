import chalk from "chalk";
import CliTable3 from "cli-table3";
import { chalkColorByJsType } from "./chalkUtils";

export function extractDataToVisualize(data: any) {
  if (Array.isArray(data)) return data;

  const keyValue = Object.entries(data);

  const dataToVisualize = keyValue.filter(([key, value]) => {
    if (key === "meta") return false;
    if (key === "data") return true;
    if (typeof value === "object") return true;
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object"
    ) {
      return true;
    }
  });

  return dataToVisualize;
}

export function returnDataRowsTable() {
  return new CliTable3({
    head: [],
    style: {
      head: ["green"],
      compact: true,
      "padding-left": 2,
      "padding-right": 2,
    },
    chars: {
      top: "═",
      "top-mid": "╤",
      "top-left": "╔",
      "top-right": "╗",
      bottom: "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      left: "║",
      "left-mid": "╟",
      mid: "─",
      "mid-mid": "┼",
      right: "║",
      "right-mid": "╢",
      middle: "│",
    },
  });
}

export function getLoopLimit(data: any, limit?: number) {
  // Default limit is 3
  let loopLimit = 3;
  if (limit && limit < data.length) loopLimit = limit;
  else if (limit) loopLimit = data.length;
  return loopLimit;
}

export function returnObjectInRow(item: any) {
  const keyValue = Object.entries(item as any);
  const threeFirstJoined = keyValue.slice(0, 3).map(([k, v]) => {
    if (typeof v === "object") {
      return `${k}: ${JSON.stringify(v)}`;
    }
    return `${k}: ${v}`;
  });
  return `{ ${threeFirstJoined.join(", ")}, ... }`;
}

export function returnArrayInRow(item: any) {
  return `[ ${item.slice(0, 5).join(", ")} ]`;
}

export function addItemToTable(table: CliTable3.Table, key: any, item: any) {
  const valueType = Array.isArray(item) ? "Array" : typeof item;
  let itemValue = item;

  if (typeof item === "object" && !Array.isArray(item)) {
    itemValue = returnObjectInRow(item);
  }
  if (Array.isArray(item)) {
    itemValue = returnArrayInRow(item);
  }

  table.push({
    [chalk.visible(key || "")]: chalkColorByJsType(
      itemValue.length > 50 ? itemValue.slice(0, 80) + "..." : itemValue,
      valueType,
    ),
  });
}

export function printWhenDataIsArray(data: any, limit?: number) {
  const table = returnDataRowsTable();
  const loopLimit = getLoopLimit(data, limit);

  for (let i = 0; i < loopLimit; i++) {
    const itemKeyValue = Object.entries(data[i]);

    itemKeyValue.forEach(([key, value]: [any, any]) => {
      console.log(key, value);
    });
  }
}

export function printWhenDataContainsKeyValues(data: any, limit?: number) {
  data.forEach(([key, value]: [any, any]) => {
    const loopLimit = getLoopLimit(value, limit);

    console.log(
      `\n${chalk.bgBlack.bold.green(key)} - ${chalk.bgBlack.gray(`showing ${chalk.bold.white(loopLimit)} of ${chalk.bold.white(value.length)} total items\n`)}`,
    );

    const table = returnDataRowsTable();

    table.push({});

    for (let i = 0; i < loopLimit; i++) {
      let item = value[i];
      const itemKeyValue = Object.entries(item);
      itemKeyValue.forEach(([key, value]: [any, any]) => {
        addItemToTable(table, key, value);
      });
      table.push({});
      table.push({});
    }
    console.log(table.toString());
  });
}

export function printDataAsTable(data: any, limit?: number) {
  printWhenDataContainsKeyValues(data, limit);
}

export function printDataInformation(data: any[]) {
  const table = new CliTable3({
    head: [
      chalk.bgBlack.bold.green("Fields"),
      chalk.bgBlack.bold.green("Type"),
    ],
    style: {
      "padding-left": 2,
      "padding-right": 2,
    },
  });

  const keysMap = new Map<string, any>();
  const keyValuePairs: [string, string][] = [];

  data.forEach(([key, values]) => {
    console.log(`\n\n ${chalk.bold.green(key)} - Fields and Types \n`);

    const valuesArray = Object.values(values);
    valuesArray.forEach((value) => {
      const keyValue = Object.entries(value as any);
      keyValue.forEach(([key, value]) => {
        !keysMap.has(key) &&
          keyValuePairs.push([
            key,
            Array.isArray(value) ? "Array" : typeof value,
          ]);
        keysMap.set(key, true);
      });
    });

    keyValuePairs.forEach(([key, value]) => {
      table.push({
        [chalk.bgBlack(key)]: chalkColorByJsType(value, value),
      });
    });

    console.log(table.toString());
  });
}
