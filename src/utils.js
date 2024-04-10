const fs = require('fs');
const cheerio = require('cheerio');
const { glob } = require('glob');
const findChromeExtension = require('../lib/findChromeExtension');

const getBrowserType = (userAgent) => {

  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Arc')) return 'Arc';
  return 'Unknown';
};

const getExtDirPath = (req, res) => {
  const { name, extId } = req.body;
  if (!extId || !name) {
    return res.status(400).json({ error: 'extId and name are required' });
  }
  const browser = getBrowserType(req.headers['user-agent']);
  return findChromeExtension(decodeURIComponent(name), extId, browser);
};


const getAllHtmlDatas = async (folderPath) => {
  try {
    const files = await glob(`${folderPath}/**/*.html`);
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
