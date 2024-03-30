

var fs = require("fs")
var base91 = require("node-base91")
function getByteArray(filePath){
    let fileData = fs.readFileSync(filePath).toString('hex');
    let result = []
    for (var i = 0; i < fileData.length; i+=2)
      result.push('0x'+fileData[i]+''+fileData[i+1])
    return result;
}
var bytes = getByteArray(process.argv[2])
var encoded = base91.encode(bytes)
fs.writeFileSync(process.argv[2]+".e91", encoded)