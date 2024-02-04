import fs from "fs";
import { deleteFile } from "./delete.js";

async function copyFile(sourceFilePath, destinationFilePath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(destinationFilePath);

    readStream.on("error", (error) => {
      reject(error);
    });

    writeStream.on("error", (error) => {
      reject(error);
    });

    writeStream.on("finish", () => {
      resolve();
      console.log("File copied successfully.");
    });

    readStream.pipe(writeStream);
  });
}

async function moveFile(sourceFilePath, destinationFilePath) {
  return new Promise((resolve, reject) => {
    const sourceStream = fs.createReadStream(sourceFilePath);
    const destinationStream = fs.createWriteStream(destinationFilePath);

    sourceStream.pipe(destinationStream);

    sourceStream.on("end", async () => {
      await deleteFile(sourceFilePath)
        .then(() => {
          console.log("File moved successfully.");
          resolve();
        })
        .catch(() => reject(error));
    });

    sourceStream.on("error", (error) => {
      reject(error);
    });

    destinationStream.on("error", (error) => {
      reject(error);
    });
  });
}

export { copyFile, moveFile };
