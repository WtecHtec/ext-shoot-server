
	const directoriesChrme = {
		darwin: ['Library', 'Application Support', 'Google', 'Chrome'],
		win32: ['AppData', 'Local', 'Google', 'Chrome', 'User Data'],
		linux: ['.config', 'google-chrome']
	};

  const directoriesChrmeDev = {
		darwin: ['Library', 'Application Support', 'Google', 'Chrome Dev'],
		win32: ['AppData', 'Local', 'Google', 'Chrome Dev', 'User Data'],
		linux: ['.config', 'google-chrome-dev']
	};
  const directoriesEdge = {
		darwin: ['Library', 'Application Support', 'Microsoft Edge',],
		win32: ['AppData', 'Local', 'Microsoft', 'Edge', 'User Data'],
		linux: ['.config', 'microsoft-edge']
	};

  const directoriesEdgeDev = {
		darwin: ['Library', 'Application Support', 'Microsoft Edge Dev',],
		win32: ['AppData', 'Local', 'Microsoft', 'Edge Dev', 'User Data'],
		linux: ['.config', 'microsoft-edge-dev']
	};

  const directoriesArc = {
		darwin: ['Library', 'Application Support', 'Arc', 'User Data'],
		win32: ['AppData', 'Local', 'Arc', 'User Data'],
		linux: ['.config', 'microsoft-arc']
	};

  const directoriesArcDev = {
		darwin: ['Library', 'Application Support', 'Arc Dev', 'User Data'],
		win32: ['AppData', 'Local', 'Arc', 'User Data'],
		linux: ['.config', 'microsoft-arc-dev']
	};

const BROWSER_MAPPING = {
  Chrome: directoriesChrme,
  ChromeDev: directoriesChrmeDev,
  Edge: directoriesEdge,
  EdgeDev: directoriesEdgeDev,
  Arc: directoriesArc,
  ArcDev: directoriesArcDev,
}
module.exports = BROWSER_MAPPING