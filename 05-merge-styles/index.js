const fs = require('fs');
const path = require('path');
fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');
async function copyDir() { 
  const files = await fs.promises.readdir('./05-merge-styles/styles', {withFileTypes: true});
  for (const file of files)
  {
    if (path.extname(file.name) == '.css') {
      console.log(file.name);
      var style = await fs.promises.readFile('./05-merge-styles/styles/'+file.name);
      var style_str = style.toString();
      fs.appendFile('./05-merge-styles/project-dist/bundle.css', style_str, function(){});
    }
  }
}
copyDir();
