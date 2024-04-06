import { glob } from "glob";
import findChromeExtension from "./lib/findChromeExtension";

const getBrowserType = (userAgent: string | string[]): any => {

  if (userAgent.includes("Edg")) return "Edge";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Arc")) return "Arc";
  return "Unknown";
};

const getExtDirPath = (req: any, res: any) : any => {
  const { name, extId } = req.body;
  if (!extId || !name) {
    return res.status(400).json({ error: "extId and name are required" });
  }
  const browser = getBrowserType(req.headers["user-agent"]);
  return findChromeExtension(decodeURIComponent(name), extId, browser);

};

const getAllHtmlDatas = async (folderPath: string): Promise<any> => {
  try {
    const files = await glob(`${folderPath}/**/*.html`);
    return files.map((file) => {
      return {
        path: file.split(folderPath)[1],
      };
    });
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export  { 
	getExtDirPath, 
	getAllHtmlDatas, 
	getBrowserType 
};
