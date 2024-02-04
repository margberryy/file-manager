import fs from "fs";
import crypto from "crypto";

async function getHash(sourceFilePath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(sourceFilePath);
    const hash = crypto.createHash("sha256");

    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    readStream.on("end", () => {
      const calculatedHash = hash.digest("hex");
      console.log(calculatedHash);
      resolve();
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
}

export { getHash };
