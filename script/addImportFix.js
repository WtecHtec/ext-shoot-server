import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import babel from "@babel/core";
import generate from "@babel/generator"; 
// const babel = require("@babel/core");
// const t = require("@babel/types");
// const fs = require("node:fs/promises");
// const path = require("node:path");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "../dist");
void async function () {
    try {
				const files = await glob(`${rootPath}/**/*.js`);
        files.map(async (file) => {
						const ast = await transformImportDeclarations(file);
						const { code } = generate.default(ast, {
							jsescOption: {
								minimal: true, // 避免中文乱码
							},
						},); 
						fs.writeFile(file, code, "utf-8");
				});
    } catch (error) {
        console.log(error);
    }

}();


function transformImportDeclarations(filePath) {


  return fs.readFile(filePath, "utf-8").then((code) => {
    const ast = babel.parseSync(code, {
      sourceType: "module",
      plugins: [],
    });

    const visitor = {
      ImportDeclaration(astPath) {
				try {
					const value =  astPath.node.source.value;
					if (value && value.indexOf(".") === 0 && value.indexOf(".js") === -1) {
						astPath.node.source.value = `${value}.js`;
						astPath.skip();
					}
				} catch (error) {
				}
      },
    };

    babel.traverse(ast, visitor);

    return ast;
  });
}

