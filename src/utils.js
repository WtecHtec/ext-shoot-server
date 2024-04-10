const fs = require('fs');
const cheerio = require('cheerio');
const { glob } = require('glob');
const findChromeExtension = require('../lib/findChromeExtension');
const { getBrowserInfo } = require("../lib/activateExtension");

const getBrowserType = (userAgent) => {

    if (userAgent.includes('Edg')) return 'Edge';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Arc')) return 'Arc';
    return 'Unknown';
};

const detectActiveBrowserType = async () => {
    const activeBrowser = await getBrowserInfo();
    if (!activeBrowser) {
        return null;
    }
    // 如果不是浏览器，则返回null
    if (!activeBrowser.includes('Chrome') && !activeBrowser.includes('Edge') && !activeBrowser.includes('Arc')) {
        return null;
    }

    return activeBrowser;

}

const getExtDirPath = async (req, res) => {
    const { name, extId } = req.body;
    if (!extId || !name) {
        return res.status(400).json({ error: 'extId and name are required' });
    }
    const browser = await detectActiveBrowserType() ?? getBrowserType(req.headers['user-agent']);
    console.log(browser);
    return findChromeExtension(decodeURIComponent(name), extId, browser);
};


const getAllHtmlDatas = async (folderPath) => {
    try {
        const files = await glob(`${ folderPath }/**/*.html`);
        return files.map((file) => {
            const html = fs.readFileSync(file, 'utf-8');
            const $ = cheerio.load(html);
            return {
                title: $('title').text().trim() || '',
                path: file.split(folderPath)[1],
            };
        });
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

module.exports = { getExtDirPath, getAllHtmlDatas, getBrowserType };
