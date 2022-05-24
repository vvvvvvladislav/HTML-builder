const fs = require('fs');
const path = require('path');
async function f() { 
  const files = await fs.promises.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true});
  for (const file of files)
    if (file.isFile())
    {
      const stats = await fs.promises.stat('./03-files-in-folder/secret-folder/'+file.name);
      console.log(path.basename(file.name, path.extname(file.name)) + ' // ' + path.extname(file.name).slice(1) + ' // ' + Math.round(stats.size / 1024) + 'kb');
    }
}
f();