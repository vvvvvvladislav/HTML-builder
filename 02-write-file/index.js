const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface(process.stdin, process.stdout);
let txt = fs.createWriteStream('./02-write-file/txt.txt');
rl.on('SIGINT', () => {
  console.log(
    '\nnoooo, why would you do that?!?!?'
  );
  return rl.close();
});
var startUp = function () {
  rl.question('I need your text now! give it to me: ', (answer) => {
    // TODO: Log the answer in a database
    if (answer == 'exit') {
      console.log(
        'no more text? how sad!'
      );
      return rl.close();
    }
    console.log(
      `thx! your input is: ${answer}`
    );
    txt.write(answer);
    startUp();
  });
};
startUp();
