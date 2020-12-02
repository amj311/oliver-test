const { expect, test } = require("../dist/index")

function freeze(time) {
    const stop = new Date().getTime() + time;
    while(new Date().getTime() < stop);       
}

test("Custom Timeout 5000", function() {
    freeze(6000);
}, 5000)