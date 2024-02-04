import path from "path";
import fs from "fs";

// Code for reading a file
async function readFile(filePath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    // const customError = new Error("Simulated error in read stream");
    // readStream.emit("error", customError);
    readStream
      .on("data", (chunk) => {
        console.log(chunk.toString());
        resolve();
      })
      .on("close", () => {
        readStream.close();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function addFile(fileName) {
  const currentWorkingDirectory = process.cwd();
  const filePath = path.join(currentWorkingDirectory, fileName);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, "", (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("File added successfully");
        resolve();
      }
    });
  });
}

async function renameFile(oldFilePath, newFilePath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("File renamed successfully");
        resolve();
      }
    });
  });
}

export { readFile, addFile, renameFile };
