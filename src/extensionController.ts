import { getExtDirPath, getAllHtmlDatas } from "./utils";
import { openExplorer } from "explorer-opener";
import { activateExtension } from "./lib/activateExtension";
const openExtension = (req: any, res: any): any => {
  const pluginPath = getExtDirPath(req, res);

  if (!pluginPath) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  openExplorer(pluginPath);
  res.json({ message: "Find successfully" });
};

const getHtmlPages = async (req: any, res: any): Promise<any> => {
  const pluginPath = getExtDirPath(req, res);
  console.log("pluginPath", pluginPath);
  if (!pluginPath) {
		res.status(200).json({ pages: [] });
    return;
  }
  const htmlDatas = await getAllHtmlDatas(pluginPath);
  res.status(200).json({ pages: htmlDatas });
};

const getHealth = (req: any, res: any) => {
  res.send("ok");
};

const activateExtensionByName = (req: any, res: any) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "extName is required" });
    return;
  }
  activateExtension(name);
  res.status(200).json({ message: "Activated" });

};
export default { openExtension, getHtmlPages, getHealth, activateExtensionByName };
