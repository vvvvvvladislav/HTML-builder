const fs = require('fs');
const path = require('path');
var txt = path.join('./01-read-file/text.txt');
var stream = new fs.ReadStream(txt);
stream.on('readable', function() {
  var data = stream.read();
  if (data != null)
    process.stdout.write(data.toString());
});
stream.on('end', function(){
});