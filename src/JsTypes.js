const typeNames = new Map(); // Map<Type,String>
var util = require('util');

typeNames.set(String,"string");
typeNames.set(Array,"Array");
typeNames.set(Promise,"Promise");

determineType = function(obj) {
    let type = typeof obj;
    if (type == "object") {
        Array.from(typeNames.keys()).forEach(key => {
            if (obj instanceof key) type = typeNames.get(key);
        })
    }
    if (type == "object") {
        if (obj.__proto__) {
            let str = util.format(obj.__proto__);
            type = str.substr(0,str.indexOf(" {"))
        }
    }
    return type;
}

module.exports = {determineType, typeNames}