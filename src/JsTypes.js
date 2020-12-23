const typeNames = new Map(); // Map<Type,String>


determineType = function(obj) {
    let type;
    Array.from(typeNames.keys()).forEach(key => {
        if (obj instanceof key) type = typeNames.get(key);
    })
    return type? type : typeof obj;
}


typeNames.set(String,"String");
typeNames.set(Array,"Array");
typeNames.set(Date,"Date");
typeNames.set(Map,"Map");
typeNames.set(WeakMap,"WeakMap");
typeNames.set(Set,"Set");
typeNames.set(WeakSet,"WeakSet");
typeNames.set(Promise,"Promise");
typeNames.set(Function,"Function");
typeNames.set(ArrayBuffer,"ArrayBuffer");
typeNames.set(SharedArrayBuffer,"SharedArrayBuffer");
typeNames.set(BigInt64Array,"BigInt64Array");
typeNames.set(BigUint64Array,"BigUint64Array");
typeNames.set(Float32Array,"Float32Array");
typeNames.set(Float64Array,"Float64Array");
typeNames.set(Int16Array,"Int16Array");
typeNames.set(Int32Array,"Int32Array");
typeNames.set(Int8Array,"Int8Array");
typeNames.set(DataView,"DataView");

module.exports = {determineType, typeNames}