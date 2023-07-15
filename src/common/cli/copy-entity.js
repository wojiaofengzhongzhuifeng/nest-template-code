const fs = require('fs');
const path = require('path');

function copyDir(src, dest, oldName, newName) {
  fs.mkdirSync(dest, { recursive: true });

  let entries = fs.readdirSync(src, { withFileTypes: true });

  let oldNameCapitalized = capitalize(oldName);
  let newNameCapitalized = capitalize(newName);

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, replaceName(entry.name, oldName, newName, oldNameCapitalized, newNameCapitalized));

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, oldName, newName);
    } else {
      let contents = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(destPath, replaceInContents(contents, oldName, newName, oldNameCapitalized, newNameCapitalized));
    }
  }
}

function replaceName(filename, oldName, newName, oldNameCapitalized, newNameCapitalized) {
  let re1 = new RegExp(`${oldName}`, 'g');
  let re2 = new RegExp(`${oldNameCapitalized}`, 'g');
  return filename.replace(re1, newName).replace(re2, newNameCapitalized);
}

function replaceInContents(contents, oldName, newName, oldNameCapitalized, newNameCapitalized) {
  let re1 = new RegExp(`${oldName}`, 'g');
  let re2 = new RegExp(`${oldNameCapitalized}`, 'g');
  return contents.replace(re1, newName).replace(re2, newNameCapitalized);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 使用方法：
// copyDir('path/to/oldName', 'path/to/newName', 'oldName', 'newName');
const path1 = path.resolve('./src/author')
const path2 = path.resolve('./src/todo')


copyDir(path1, path2, 'author', 'todo');
