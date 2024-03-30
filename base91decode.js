

var fs = require("fs");
var base91 = require("node-base91");
let fileData = fs.readFileSync(process.argv[2]).toString('ascii');
var decoded = base91.decode(fileData)

let fileName = process.argv[2];
if (fileName.endsWith('.e91')) {
  fileName = fileName.slice(0, -4);
}
fs.writeFileSync(fileName + ".d91", decoded);
