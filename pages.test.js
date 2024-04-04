
const { glob } = require('glob');
const folderPath = '/Users/shenruqi/Desktop/Code/RMBproject/ext-shoot/build/chrome-mv3-prod'


console.log('eee')

async function  main () {
	const jsfiles =  await glob(`${folderPath}/**/*.html`,)
	console.log('jsfiles--', jsfiles)
}

main()