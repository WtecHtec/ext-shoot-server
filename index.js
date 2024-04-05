const express = require('express');
const cors = require('cors');
const fs = require('fs');
const cheerio = require('cheerio');
const { glob } = require('glob');
const findChromeExtension = require('./lib/find-chrome-extension');
const { openExplorer } = require('explorer-opener');

const app = express();
app.use(cors());
app.use(express.json());

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

app.post('/submit', (req, res) => {
  const pluginPath = getExtDirPath(req, res);
  if (!pluginPath) {
    return; // Error response is handled in getExtDirPath
  }
  openExplorer(pluginPath);
  res.json({ message: 'Find successfully' });
});

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

app.post('/pages', async (req, res) => {
  const pluginPath = getExtDirPath(req, res);
  if (!pluginPath) {
    return; // Error response is handled in getExtDirPath
  }
  const htmlDatas = await getAllHtmlDatas(pluginPath);
  res.status(200).json({ pages: htmlDatas });
});

const PORT = process.env.PORT || 5698;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT};`);
});
