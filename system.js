import os from "os";
import crypto from "crypto";
import zlib from "zlib";

function getCPU() {
  const cpus = os.cpus();

  console.log("Overall CPUs:", cpus.length);
  console.log("-----");

  cpus.forEach((cpu, index) => {
    console.log(`CPU #${index + 1}`);
    console.log(`Model: ${cpu.model}`);
    console.log(`Clock rate: ${cpu.speed / 1000} GHz`);
    console.log("-----");
  });
}

function getHomeDir() {
  const homeDir = os.homedir();
  console.log("Home Directory:", homeDir);
}

function getUsername() {
  const userInfo = os.userInfo();
  const username = userInfo.username;
  console.log("Current User Name:", username);
}

function getArchitecture() {
  const cpuArchitecture = process.arch;
  console.log("CPU Architecture:", cpuArchitecture);
}

export { getCPU, getHomeDir, getUsername, getArchitecture };
