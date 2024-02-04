import readline from "readline";
import os from "os";
import fs from "fs";
import path from "path";
import { listDirectoryContent, handleNavigationCommand } from "./commands.js";
import { addFile, readFile, renameFile } from "./file.js";
import { copyFile, moveFile } from "./copy-move.js";
import { deleteFile } from "./delete.js";
import { getArchitecture, getCPU, getHomeDir, getUsername } from "./system.js";
import { getHash } from "./hash.js";
import { compressFile, decompressFile } from "./compression.js";

const args = process.argv;
let username = "Unknown User";
const initialWorkingDirectory = os.homedir();
// Set the current working directory to the initial working directory
process.chdir(initialWorkingDirectory);

const currentWorkingDirectory = process.cwd();

for (const arg of args) {
  if (arg.startsWith("--username=")) {
    username = arg.substring("--username=".length);
    break;
  }
}
console.log(`Welcome to the File Manager, ${username}!`);
console.log(`\nYou are currently in ${currentWorkingDirectory}\n`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.prompt();
rl.on("line", async (line) => {
  const command = line.trim();
  await handleCommands(command);

  const currentWorkingDirectory = process.cwd();
  console.log(`\nYou are currently in ${currentWorkingDirectory}\n`);
  rl.prompt();
}).on("close", () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

process.on("SIGINT", () => {
  rl.close();
});

async function handleCommands(command) {
  try {
    if (command === ".exit") {
      rl.close();
    } else if (command.startsWith("cd ") || command === "up") {
      handleNavigationCommand(command);
    } else if (command === "ls") {
      listDirectoryContent();
    } else if (command.startsWith("cat ")) {
      const filePath = command.substring(4).trim();
      (await checkAccessToFile(filePath)) && (await readFile(filePath));
    } else if (command.startsWith("add ")) {
      const fileName = command.substring(4).trim();
      await addFile(fileName);
    } else if (command.startsWith("rn ")) {
      const oldFilePath = command
        .substring(3)
        .split(" ")
        .filter((arg) => arg.trim() !== "")[0];
      const newFileName = command
        .substring(3)
        .split(" ")
        .filter((arg) => arg.trim() !== "")[1];
      const newFilePath = path.join(path.dirname(oldFilePath), newFileName);
      (await checkAccessToFile(oldFilePath)) &&
        (await renameFile(oldFilePath, newFilePath));
    } else if (command.startsWith("cp ")) {
      const [sourceFilePath, destinationFilePath] = getPaths(command, 2);
      (await checkAccessToFile(sourceFilePath)) &&
        (await copyFile(sourceFilePath, destinationFilePath));
    } else if (command.startsWith("mv ")) {
      const [sourceFilePath, destinationFilePath] = getPaths(command, 2);
      (await checkAccessToFile(sourceFilePath)) &&
        (await moveFile(sourceFilePath, destinationFilePath));
    } else if (command.startsWith("rm ")) {
      const [sourceFilePath] = command
        .substring(2)
        .split(" ")
        .filter((arg) => arg.trim() !== "");
      (await checkAccessToFile(sourceFilePath)) &&
        (await deleteFile(sourceFilePath));
    } else if (command === "os --EOL") {
      const systemEOL = os.EOL;
      console.log("System EOL:", JSON.stringify(systemEOL));
    } else if (command === "os --cpus") {
      getCPU();
    } else if (command === "os --homedir") {
      getHomeDir();
    } else if (command === "os --username") {
      getUsername();
    } else if (command === "os --architecture") {
      getArchitecture();
    } else if (command.startsWith("hash ")) {
      const [sourceFilePath] = command
        .substring(4)
        .split(" ")
        .filter((arg) => arg.trim() !== "");
      (await checkAccessToFile(sourceFilePath)) &&
        (await getHash(sourceFilePath));
    } else if (command.startsWith("compress ")) {
      const [sourceFilePath, destinationFilePath] = command
        .substring(8)
        .split(" ")
        .filter((arg) => arg.trim() !== "");

      (await checkAccessToFile(sourceFilePath)) &&
        (await compressFile(sourceFilePath, destinationFilePath));
    } else if (command.startsWith("decompress ")) {
      const [sourceFilePath, destinationFilePath] = command
        .substring(10)
        .split(" ")
        .filter((arg) => arg.trim() !== "");

      (await checkAccessToFile(sourceFilePath)) &&
        (await decompressFile(sourceFilePath, destinationFilePath));
    } else {
      console.log("Invalid input: ", command);
    }
  } catch (error) {
    console.log("Operation failed:", error);
  }
}

function getPaths(command, substring) {
  const [sourceFilePath, destinationDir] = command
    .substring(substring)
    .split(" ")
    .filter((arg) => arg.trim() !== "");

  const destinationFilePath = path.join(
    destinationDir,
    path.basename(sourceFilePath)
  );
  return [sourceFilePath, destinationFilePath];
}

async function checkAccessToFile(filePath) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    console.log("Invalid input:", error.message);
    return false;
  }
}
