import csv from "csvtojson";
import { createReadStream, createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

const inputPath = path.join(__dirname, "csv/test.csv");
const outputDir = path.join(__dirname, "json");
const outputPath = path.join(outputDir, `${new Date().getTime()}.txt`);

if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

const errorHandler = console.error;

const readCsvStream = createReadStream(inputPath).on("error", errorHandler);
const writeJsonStream = createWriteStream(outputPath).on("error", errorHandler);

pipeline(
  csv().fromStream(readCsvStream),
  writeJsonStream.on("error", errorHandler)
);
