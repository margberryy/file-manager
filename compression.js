import fs from "fs";
import zlib from "zlib";

async function compressFile(sourceFilePath, destinationFilePath) {
  return new Promise((resolve, reject) => {
    console.log(sourceFilePath, destinationFilePath);
    const sourceStream = fs.createReadStream(sourceFilePath);
    const destinationStream = fs.createWriteStream(destinationFilePath);

    const brotliStream = zlib.createBrotliCompress();

    sourceStream.pipe(brotliStream).pipe(destinationStream);

    pipeline(sourceStream, brotliStream, destinationStream, (error) => {
      if (error) {
        reject(error);
      }
      console.log("File compressed successfully.");
      resolve();
    });
  });
}

async function decompressFile(compressedFilePath, destinationFilePath) {
  return new Promise((resolve, reject) => {
    const sourceStream = fs.createReadStream(compressedFilePath);
    const destinationStream = fs.createWriteStream(destinationFilePath);

    const brotliStream = zlib.createBrotliDecompress();

    sourceStream.pipe(brotliStream).pipe(destinationStream);

    pipeline(sourceStream, brotliStream, destinationStream, (error) => {
      if (error) {
        reject(error);
      }
      console.log("File decompressed successfully.");
      resolve();
    });
  });
}

export { compressFile, decompressFile };
