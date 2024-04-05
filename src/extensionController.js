const { getExtDirPath, getAllHtmlDatas } = require('./utils');
const { openExplorer } = require('explorer-opener');
const { activateExtension } = require('../lib/activateExtension');
const openExtension = (req, res) => {
  const pluginPath = getExtDirPath(req, res);

  if (!pluginPath) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  openExplorer(pluginPath);
  res.json({ message: 'Find successfully' });
};

const getHtmlPages = async (req, res) => {
  const pluginPath = getExtDirPath(req, res);
  console.log('pluginPath', pluginPath)
  if (!pluginPath) {
    return;
  }
  const htmlDatas = await getAllHtmlDatas(pluginPath);
  res.status(200).json({ pages: htmlDatas });
};

const getHealth = (req, res) => {
  res.send('ok');
}

const activateExtensionByName = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: 'extName is required' });
    return;
  }
  activateExtension(name);
  res.status(200).json({ message: 'Activated' });

};
module.exports = { openExtension, getHtmlPages, getHealth, activateExtensionByName };
