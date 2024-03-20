const { findChromeExtension, findChromeExtensionByLocal } = require('./lib/find-chrome-extension')
let pluginPath = findChromeExtension('浸式翻译: 双语对照网页翻译 & PDF文档翻译')
console.log(pluginPath)

findChromeExtensionByLocal('', 'ibjiphcemclndcdihkgmkbmihaepnefd')