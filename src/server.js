#!/usr/bin/env node
const { exec } = require('child_process');
const path = require('path');
const arg1 = process.argv[2];
const indexPath = path.join(__dirname, 'index.js');


if (!arg1 || arg1 === 'start') {
  exec(`npx pm2 start ${indexPath} --name extss`, { encoding: 'utf8' }, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
} else if (arg1 === 'stop') {
  exec(`npx pm2 delete ${indexPath}`, { encoding: 'utf8' }, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
} else {
  console.log('Use "extss start" or "extss stop"');
}
