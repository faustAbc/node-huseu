import csv from "csvtojson";
import { createReadStream, createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

const initialMemoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;

const inputPath = path.join(__dirname, "csv/test.csv");
const outputDir = path.join(__dirname, "json");
const outputPath = path.join(outputDir, `${new Date().getTime()}.txt`);

if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

const errorHandler = (error: Error) => console.error.bind(console, error);

const readCsvStream = createReadStream(inputPath).on("error", errorHandler);
const writeJsonStream = createWriteStream(outputPath).on("error", errorHandler);
const closeHandler = () => {
  const finalMemoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    "Used memory: " + (finalMemoryUsed - initialMemoryUsed).toFixed(2) + " MB"
  );
};

pipeline(
  csv().fromStream(readCsvStream),
  writeJsonStream.on("error", errorHandler).on("close", closeHandler)
);
