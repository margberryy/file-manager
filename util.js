import path from "path";
import fs from "fs";
import os from "os";
import crypto from "crypto";
import zlib from "zlib";
import { pipeline } from "stream";

const Commands = {
  // handleNavigationCommand(command) {
  //   let pathToDirectory;
  //   const currentWorkingDirectory = process.cwd();
  //   const parentDirectory = path.dirname(currentWorkingDirectory);
  //   if (command.startsWith("cd ")) {
  //     pathToDirectory = command.substring(3).trim();
  //     try {
  //       fs.statSync(pathToDirectory).isDirectory();
  //       process.chdir(pathToDirectory);
  //     } catch (error) {
  //       console.log("Invalid input: ", error.message);
  //     }
  //   } else if (command === "up") {
  //     if (currentWorkingDirectory !== parentDirectory) {
  //       process.chdir(parentDirectory);
  //     } else {
  //       console.log("Cannot go upper than the root directory.");
  //     }
  //   }
  // },
  // listDirectoryContent() {
  //   const currentWorkingDirectory = process.cwd();
  //   const contents = fs.readdirSync(currentWorkingDirectory).sort();
  //   const folders = [];
  //   const files = [];
  //   const filesWithoutAccess = [];
  //   contents.forEach((file) => {
  //     const fullPath = `${currentWorkingDirectory}/${file}`;
  //     let isDirectory;
  //     try {
  //       isDirectory = fs.statSync(fullPath).isDirectory();
  //     } catch (error) {
  //       filesWithoutAccess.push({
  //         Name: file,
  //         Type: `Unable to get type of ${file}: ${error.message}`,
  //       });
  //     }
  //     if (isDirectory) {
  //       folders.push({
  //         Name: file,
  //         Type: "directory",
  //       });
  //     } else {
  //       files.push({
  //         Name: file,
  //         Type: "file",
  //       });
  //     }
  //   });
  //   console.table([...folders, ...files, ...filesWithoutAccess]);
  // },
  // async readFile(filePath) {
  //   return new Promise((resolve, reject) => {
  //     const readStream = fs.createReadStream(filePath);
  //     // const customError = new Error("Simulated error in read stream");
  //     // readStream.emit("error", customError);
  //     readStream
  //       .on("data", (chunk) => {
  //         console.log(chunk.toString());
  //         resolve();
  //       })
  //       .on("close", () => {
  //         readStream.close();
  //       })
  //       .on("error", (error) => {
  //         reject(error);
  //       });
  //   });
  // },
  // async addFile(fileName) {
  //   const currentWorkingDirectory = process.cwd();
  //   const filePath = path.join(currentWorkingDirectory, fileName);
  //   return new Promise((resolve, reject) => {
  //     fs.writeFile(filePath, "", (err) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         console.log("File added successfully");
  //         resolve();
  //       }
  //     });
  //   });
  // },
  // async renameFile(oldFilePath, newFilePath) {
  //   return new Promise((resolve, reject) => {
  //     fs.rename(oldFilePath, newFilePath, (err) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         console.log("File renamed successfully");
  //         resolve();
  //       }
  //     });
  //   });
  // },
  // async copyFile(sourceFilePath, destinationFilePath) {
  //   return new Promise((resolve, reject) => {
  //     const readStream = fs.createReadStream(sourceFilePath);
  //     const writeStream = fs.createWriteStream(destinationFilePath);
  //     readStream.on("error", (error) => {
  //       reject(error);
  //     });
  //     writeStream.on("error", (error) => {
  //       reject(error);
  //     });
  //     writeStream.on("finish", () => {
  //       resolve();
  //       console.log("File copied successfully.");
  //     });
  //     readStream.pipe(writeStream);
  //   });
  // },
  // async moveFile(sourceFilePath, destinationFilePath) {
  //   return new Promise((resolve, reject) => {
  //     const sourceStream = fs.createReadStream(sourceFilePath);
  //     const destinationStream = fs.createWriteStream(destinationFilePath);
  //     sourceStream.pipe(destinationStream);
  //     sourceStream.on("end", async () => {
  //       await this.deleteFile(sourceFilePath)
  //         .then(() => {
  //           console.log("File moved successfully.");
  //           resolve();
  //         })
  //         .catch(() => reject(error));
  //     });
  //     sourceStream.on("error", (error) => {
  //       reject(error);
  //     });
  //     destinationStream.on("error", (error) => {
  //       reject(error);
  //     });
  //   });
  // },
  // async deleteFile(filePath) {
  //   return new Promise((resolve, reject) => {
  //     fs.unlink(filePath, (error) => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve();
  //       }
  //     });
  //   });
  // },
  // getCPU() {
  //   const cpus = os.cpus();
  //   console.log("Overall CPUs:", cpus.length);
  //   console.log("-----");
  //   cpus.forEach((cpu, index) => {
  //     console.log(`CPU #${index + 1}`);
  //     console.log(`Model: ${cpu.model}`);
  //     console.log(`Clock rate: ${cpu.speed / 1000} GHz`);
  //     console.log("-----");
  //   });
  // },
  // getHomeDir() {
  //   const homeDir = os.homedir();
  //   console.log("Home Directory:", homeDir);
  // },
  // getUsername() {
  //   const userInfo = os.userInfo();
  //   const username = userInfo.username;
  //   console.log("Current User Name:", username);
  // },
  // getArchitecture() {
  //   const cpuArchitecture = process.arch;
  //   console.log("CPU Architecture:", cpuArchitecture);
  // },
  // async getHash(sourceFilePath) {
  //   return new Promise((resolve, reject) => {
  //     const readStream = fs.createReadStream(sourceFilePath);
  //     const hash = crypto.createHash("sha256");
  //     readStream.on("data", (chunk) => {
  //       hash.update(chunk);
  //     });
  //     readStream.on("end", () => {
  //       const calculatedHash = hash.digest("hex");
  //       console.log(calculatedHash);
  //       resolve();
  //     });
  //     readStream.on("error", (error) => {
  //       reject(error);
  //     });
  //   });
  // },
  // async compressFile(sourceFilePath, destinationFilePath) {
  //   return new Promise((resolve, reject) => {
  //     console.log(sourceFilePath, destinationFilePath);
  //     const sourceStream = fs.createReadStream(sourceFilePath);
  //     const destinationStream = fs.createWriteStream(destinationFilePath);
  //     const brotliStream = zlib.createBrotliCompress();
  //     sourceStream.pipe(brotliStream).pipe(destinationStream);
  //     pipeline(sourceStream, brotliStream, destinationStream, (error) => {
  //       if (error) {
  //         reject(error);
  //       }
  //       console.log("File compressed successfully.");
  //       resolve();
  //     });
  //   });
  // },
  // async decompressFile(compressedFilePath, destinationFilePath) {
  //   return new Promise((resolve, reject) => {
  //     const sourceStream = fs.createReadStream(compressedFilePath);
  //     const destinationStream = fs.createWriteStream(destinationFilePath);
  //     const brotliStream = zlib.createBrotliDecompress();
  //     sourceStream.pipe(brotliStream).pipe(destinationStream);
  //     pipeline(sourceStream, brotliStream, destinationStream, (error) => {
  //       if (error) {
  //         reject(error);
  //       }
  //       console.log("File decompressed successfully.");
  //       resolve();
  //     });
  //   });
  // },
};
export default Commands;
