#!/usr/bin/env node

import { GetPath } from "./util/common";

import { exec } from "child_process";

const arg1 = process.argv[2];
const indexPath = GetPath("dist/index.js");

if (!arg1 || arg1 === "start") {
  exec(`npx pm2 start ${indexPath} --name extss`, { encoding: "utf8" }, (error: any, stdout: any, stderr: any) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
} else if (arg1 === "stop") {
  exec(`npx pm2 delete ${indexPath}`, { encoding: "utf8" }, (error: any, stdout: any, stderr: any) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
} else {
  console.log("Use extss start or extss stop");
}
