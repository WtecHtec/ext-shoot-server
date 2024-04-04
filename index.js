
const express = require('express');

const cors = require('cors');

const findChromeExtension = require('./lib/find-chrome-extension')
const { openExplorer } = require('explorer-opener');
const { glob } = require('glob');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();
app.use(cors());
// 中间件解析请求体
app.use(express.json());

const getExtDirPath = (req) => {
	const { name, extId, } = req.body;
  const userAgent = req.headers['user-agent'];
  console.log('userAgent---', userAgent)
  let browser = 'Chrome';
  if (userAgent.includes('Edg Dev')) {
    browser = 'Edge';
  } else if (userAgent.includes('Chrome Dev')) {
    browser = 'Chrome';
  } else if (userAgent.includes('Arc Dev')) {
    browser = 'Arc';
  } else if (userAgent.includes('Edg')) {
    browser = 'Edge';
  } else if (userAgent.includes('Chrome')) {
    browser = 'Chrome';
  } else if (userAgent.includes('Arc')) {
    browser = 'Arc';
  } else {
    browser = 'Unknown';
  }

	// 验证两个参数是否都已填写
	if (!extId || !name) {
		return res.status(400).json({ error: 'extId and type are required' });
	}



  return findChromeExtension(decodeURIComponent(name), extId, browser)
}

app.post('/submit', (req, res) => {
	const pluginPath = getExtDirPath(req);
	if (!pluginPath) {
		return res.status(404).json({ error: 'Find Not' });
	}
	openExplorer(pluginPath)
	res.json({ message: 'Find  successfully' });
});


const getAllHtmlDatas = (folderPath) => {
	return new Promise( async (resolve) => {
		let results = [];
		try {
			const files = await glob(`${folderPath}/**/*.html`)
			results = files.map((file) => {
				const html = fs.readFileSync(file, 'utf-8');
				const $ = cheerio.load(html);
				return {
					title: $('title').text().trim() || '',
					path: file.split(folderPath)[1],
				};
			});
		} catch (error) {
			console.log('error--', error);
		}
		resolve(results);
	});
}


app.post('/pages', async (req, res) => {
	const pluginPath =getExtDirPath(req);
	if (!pluginPath) {
		return res.status(404).json({ error: 'Find Not' });
	}
	const htmlDatas = await getAllHtmlDatas(pluginPath)
	res.status(200).json({ pages: htmlDatas });
});

const PORT = 5698;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT};`);
});