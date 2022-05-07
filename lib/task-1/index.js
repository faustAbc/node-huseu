"use strict";

process.stdin.on("data", function (data) {
  console.log(data.reverse().toString().slice(1));
});