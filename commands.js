import path from "path";
import fs from "fs";

function handleNavigationCommand(command) {
  let pathToDirectory;
  const currentWorkingDirectory = process.cwd();
  const parentDirectory = path.dirname(currentWorkingDirectory);
  if (command.startsWith("cd ")) {
    pathToDirectory = command.substring(3).trim();
    try {
      fs.statSync(pathToDirectory).isDirectory();
      process.chdir(pathToDirectory);
    } catch (error) {
      console.log("Invalid input: ", error.message);
    }
  } else if (command === "up") {
    if (currentWorkingDirectory !== parentDirectory) {
      process.chdir(parentDirectory);
    } else {
      console.log("Cannot go upper than the root directory.");
    }
  }
}

function listDirectoryContent() {
  const currentWorkingDirectory = process.cwd();
  const contents = fs.readdirSync(currentWorkingDirectory).sort();
  const folders = [];
  const files = [];
  const filesWithoutAccess = [];
  contents.forEach((file) => {
    const fullPath = `${currentWorkingDirectory}/${file}`;
    let isDirectory;
    try {
      isDirectory = fs.statSync(fullPath).isDirectory();
    } catch (error) {
      filesWithoutAccess.push({
        Name: file,
        Type: `Unable to get type of ${file}: ${error.message}`,
      });
    }
    if (isDirectory) {
      folders.push({
        Name: file,
        Type: "directory",
      });
    } else {
      files.push({
        Name: file,
        Type: "file",
      });
    }
  });
  console.table([...folders, ...files, ...filesWithoutAccess]);
}

export { handleNavigationCommand, listDirectoryContent };
