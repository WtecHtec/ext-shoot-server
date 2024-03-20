#!/usr/bin/env node
const { exec } = require('child_process');
const path = require('path')
const arg1 = process.argv[2];
// 获取项目中安装的 pm2 的路径
const pm2Path = path.join(__dirname, 'node_modules', '.bin', 'pm2');
const indexPath = path.join(__dirname, 'index.js')

if (!arg1 || arg1 === 'start') {
  exec(`chcp 65001 && ${pm2Path} start ${indexPath} --name extss` , { encoding: 'utf8' },  (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
} else if (arg1 === 'stop') {
  exec(`chcp 65001 && ${pm2Path} delete ${indexPath}` , { encoding: 'utf8' },  (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
} else {
  console.log('You try extss start or extss stop')
}
