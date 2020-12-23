const { expect } = require("..");
const { test } = require("..");
const { typeNames, determineType } = require("../src/JsTypes");

let map = new Map();
map.set("arr",Array);
map.set(Array,"arr");

console.log(Array)
console.log(map.get("arr"))
console.log(map.get(Array))

let typeArr = Array.from(map.keys())

console.log(typeArr[1])
console.log([] instanceof typeArr[1])

if ([] instanceof typeArr[1]) console.log(map.get(typeArr[1]))
console.log(determineType([]))



expect.true([] instanceof map.get("arr"))