const fs = require('fs');
async function copyDir() { 
  const files = await fs.promises.readdir('./04-copy-directory/files', {withFileTypes: true});
  await fs.promises.mkdir('./04-copy-directory/files-copy', {recursive : true});
  const files_copy = await fs.promises.readdir('./04-copy-directory/files-copy', {withFileTypes: true});
  for (const file of files_copy)
  {
    await fs.promises.unlink('./04-copy-directory/files-copy/'+file.name);
  }
  for (const file of files)
  {
    await fs.promises.copyFile('./04-copy-directory/files/'+file.name, './04-copy-directory/files-copy/'+file.name);
  }
}
copyDir();