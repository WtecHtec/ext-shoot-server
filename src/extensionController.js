const { getExtDirPath, getAllHtmlDatas } = require('./utils');
const { openExplorer } = require('explorer-opener');

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
  if (!pluginPath) {
    return;
  }
  const htmlDatas = await getAllHtmlDatas(pluginPath);
  res.status(200).json({ pages: htmlDatas });
};

const getHealth = (req, res) => {
  res.send('ok');
}
module.exports = { openExtension, getHtmlPages, getHealth };
