import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


/**
 * 根目录
 */
export const rootPath = path.join(__dirname, "../../");

/**
 * Path 为项目根目录后面的目录
 * 返回绝对路径
 */
export const GetPath = (Path: string): string => {
	return path.join(rootPath, Path);
};