/* eslint-disable no-console */
const osu = require("node-os-utils");
const { exec } = require("child_process");
const cpu = osu.cpu;

export const getStats = () => {
  setInterval(async () => {
    console.log(`CPU Usage: ${await cpu.usage()}%`);
    exec(`lsof -i tcp:443 -n -P |grep "node"`, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`active sockets: ${stdout}`);
    });
  }, 1_000);
};
