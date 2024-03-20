
const express = require('express');

const cors = require('cors');

const findChromeExtension = require('./lib/find-chrome-extension')
const { openExplorer } = require('explorer-opener');

const app = express();
app.use(cors());
// 中间件解析请求体
app.use(express.json());

app.post('/submit', (req, res) => {
	const { name, extId, type } = req.body;
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



  const	pluginPath = findChromeExtension(decodeURIComponent(name), extId, browser)

	if (!pluginPath) {
		return res.status(404).json({ error: 'Find Not' });
	}
	openExplorer(pluginPath)
	res.json({ message: 'Find  successfully' });
});

const PORT = 5698;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT};`);
});