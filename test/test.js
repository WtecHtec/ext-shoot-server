// const { findChromeExtension, findChromeExtensionByLocal } = require('./lib/find-chrome-extension')
// let pluginPath = findChromeExtension('浸式翻译: 双语对照网页翻译 & PDF文档翻译')
// console.log(pluginPath)

// findChromeExtensionByLocal('', 'ibjiphcemclndcdihkgmkbmihaepnefd')

const findChromeExtension = require('find-chrome-extension2');

const dir = findChromeExtension('React Developer Tools');

console.log(dir);