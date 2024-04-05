
const { glob } = require('glob');
const folderPath = '/Users/shenruqi/Desktop/Code/RMBproject/ext-shoot/build/chrome-mv3-prod'


async function  main () {
	const jsfiles =  await glob(`${folderPath}/**/*.html`,)
	console.log('jsfiles--', jsfiles)
}

main()