const fs = require('fs');
const path = require('path');
async function createIndex() {
  await fs.promises.mkdir('./06-build-page/project-dist', {recursive: true});
  var index = (await fs.promises.readFile('./06-build-page/template.html')).toString();
  var re = RegExp('{{(.*)}}','g');
  var matches = index.match(re);
  for (const match of matches) {
    var match_edited = match.slice(2).slice(0, -2);
    var style = (await fs.promises.readFile('./06-build-page/components/'+match_edited+'.html')).toString();
    index = index.replace(match, style);
  }
  fs.promises.writeFile('./06-build-page/project-dist/index.html', index);
  mergeStyle();
}
async function mergeStyle() { 
  fs.createWriteStream('./06-build-page/project-dist/style.css');
  const files = await fs.promises.readdir('./06-build-page/styles', {withFileTypes: true});
  for (const file of files)
  {
    if (path.extname(file.name) == '.css') {
      var style = await fs.promises.readFile('./06-build-page/styles/'+file.name);
      var style_str = style.toString();
      fs.appendFile('./06-build-page/project-dist/style.css', style_str, function(){});
    }
  }
  copyDir();
}
async function copyDir() { 
  const files = await fs.promises.readdir('./06-build-page/assets', {withFileTypes: true});
  await fs.promises.mkdir('./06-build-page/project-dist/assets', {recursive : true});
  const files_copy = await fs.promises.readdir('./06-build-page/project-dist/assets', {withFileTypes: true});
  for (const file of files_copy)
  {
    const assets = await fs.promises.readdir('./06-build-page/project-dist/assets/'+file.name, {withFileTypes : true});
    for (const asset of assets)
    {
      await fs.promises.unlink('./06-build-page/project-dist/assets/'+file.name+'/'+asset.name);
    }
    fs.promises.rmdir('./06-build-page/project-dist/assets/'+file.name);
  }

  for (const file of files)
  {
    await fs.promises.mkdir('./06-build-page/project-dist/assets/'+file.name, {recursive : true});
    const assets = await fs.promises.readdir('./06-build-page/assets/'+file.name, {withFileTypes : true});
    for (const asset of assets)
    {
      await fs.promises.copyFile('./06-build-page/assets/'+file.name+'/'+asset.name, './06-build-page/project-dist/assets/'+file.name+'/'+asset.name);
    }
  }
}

createIndex();