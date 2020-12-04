const colors = require('colors')

const exp = module.exports;

exp.bold = colors.bold;
exp.yellow = colors.yellow;
exp.fgPlain = function (msg) {
    return msg;
};
exp.fgPrimary = function (msg) {
    return colors.cyan(msg);
}
exp.fgPass = function (msg) {
    return colors.green(msg);
}
exp.bgPass = function (msg) {
    return colors.bold(colors.bgGreen(" " + msg + " "));
}
exp.fgFail = function (msg) {
    return colors.red(msg);
}
exp.bgFail = function (msg) {
    return colors.bold(colors.bgRed(" " + msg + " "));
}
exp.fgDim = function (msg) {
    return colors.dim(msg);
}
exp.PASS_BADGE = exp.bgPass("PASS")
exp.PASS_ICON = exp.fgPass("✔")
exp.FAIL_BADGE = exp.bgFail("FAIL")
exp.FAIL_ICON = exp.fgFail("⨉")