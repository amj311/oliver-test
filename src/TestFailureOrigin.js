const lineReader = require('n-readlines');
const util = require("util");

class TestFailureOrigin {
  constructor(props = {}) {
    let { targLine, lineNum, targPos, prevLine, nextLine } = props;
    this.targLine = targLine;
    this.lineNum = lineNum * 1;
    this.targPos = targPos * 1;
    this.prevLine = prevLine;
    this.nextLine = nextLine;
  }

  print(config = {}) {
    let { useColor, showPeriph, showCursor } = config;
    let tab = " ".repeat(2);

    function printLine(line, num) {
      console.log((showPeriph ? num + tab : "") + line);
    };

    function printCursor(pos) {
      console.log((showPeriph ? " " + tab : "") + " ".repeat(pos - 1) + "^");
    };

    if (showPeriph) printLine(this.prevLine, this.lineNum - 1);
    printLine(this.targLine, this.lineNum);
    if (showCursor) printCursor(this.targPos);
    if (showPeriph && this.nextLine) printLine(this.nextLine,this.lineNum+1);
  }
}

extractTestFailureOrigin = function (e = new Error()) {
  let pathRegex = /[A-Z]\:(\\[\w\d\ \^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\%\.\+\~\_]+)*/g;
  let coorRegex = /\:[0-9]*\:[0-9]*/g;
  let tsImportRegex = /index_[\d]./g;
  let tsImportReplace = "";

  if (!e.stack) return null;

  let stackLines = e.stack.split("\n");
  let firstTestLine = stackLines.filter(l => l.lastIndexOf(".test.") > -1)[0]

  let path = pathRegex.exec(firstTestLine)[0]

  let coors = coorRegex.exec(firstTestLine)[0].split(":")
  let lineNum = coors[1];
  let targPos = coors[2];

  const liner = new lineReader(path);

  let prevLineBuf;
  let targLineBuf;
  let nextLineBuf;
  let curLineNumber = 0;
  let foundline = false;

  while (targLineBuf = liner.next()) {
    curLineNumber++;
    if (curLineNumber == lineNum) {
      foundline = true;
      nextLineBuf = liner.next();
      break;
    }
    prevLineBuf = targLineBuf;
  }

  if (!foundline) return console.log("Unexpected end of file.");

  function replaceTS(string) {
    let newstr = string;
    return newstr.replace(tsImportRegex, tsImportReplace);
  }

  let origtargLine = targLineBuf.toString('ascii');
  let targLine = replaceTS(origtargLine);
  targPos -= origtargLine.length - targLine.length;
  let prevLine = prevLineBuf ? replaceTS(prevLineBuf.toString('ascii')) : null;
  let nextLine = nextLineBuf ? replaceTS(nextLineBuf.toString('ascii')) : null;

  return new TestFailureOrigin({ targLine, lineNum, targPos, nextLine, prevLine })
}

module.exports = { extractTestFailureOrigin, TestFailureOrigin }