const { getExtDirPath, getAllHtmlDatas } = require('./utils');
const { openExplorer } = require('explorer-opener');
const { activateExtension, getBrowserInfo } = require('../lib/activateExtension');
const openExtension = async (req, res) => {
    const pluginPath = await getExtDirPath(req, res);

    if (!pluginPath) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    openExplorer(pluginPath);
    res.json({ message: 'Find successfully' });
};

let detectBrowser = async (req, res) => {
    const browserInfo = await getBrowserInfo()
    if (!browserInfo) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    res.json({ message: 'Find successfully', browserInfo });
};


const getHtmlPages = async (req, res) => {
    const pluginPath = await getExtDirPath(req, res);
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
module.exports = { openExtension, getHtmlPages, getHealth, activateExtensionByName, detectBrowser };
