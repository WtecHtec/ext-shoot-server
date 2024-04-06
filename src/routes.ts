import  express from "express";
import extensionController from "./extensionController";

const router = express.Router();

router.get("/health",extensionController.getHealth);
router.post("/open-extension", extensionController.openExtension);
router.post("/pages", extensionController.getHtmlPages);
router.post("/active-extension", extensionController.activateExtensionByName);

export default router;
// module.exports = router;
