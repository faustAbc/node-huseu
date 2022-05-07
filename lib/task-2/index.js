"use strict";

var _csvtojson = _interopRequireDefault(require("csvtojson"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _stream = _interopRequireDefault(require("stream"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pipeline = (0, _util.promisify)(_stream.default.pipeline);
var initialMemoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;

var inputPath = _path.default.join(__dirname, "csv/test.csv");

var outputDir = _path.default.join(__dirname, "json");

var outputPath = _path.default.join(outputDir, "".concat(new Date().getTime(), ".txt"));

if (!(0, _fs.existsSync)(outputDir)) {
  (0, _fs.mkdirSync)(outputDir);
}

var errorHandler = function errorHandler(error) {
  return console.error.bind(console, error);
};

var readCsvStream = (0, _fs.createReadStream)(inputPath).on("error", errorHandler);
var writeJsonStream = (0, _fs.createWriteStream)(outputPath).on("error", errorHandler);

var closeHandler = function closeHandler() {
  var finalMemoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log("Used memory: " + (finalMemoryUsed - initialMemoryUsed).toFixed(2) + " MB");
};

pipeline((0, _csvtojson.default)().fromStream(readCsvStream), writeJsonStream.on("error", errorHandler).on("close", closeHandler));