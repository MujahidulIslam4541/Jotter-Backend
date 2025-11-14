const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const storageController = require("../../controllers/storage.controller");
const upload = require("../../middlewares/fileUpload")("public/uploads");


// File / Folder / Note Create
router.post("/", auth(), upload.single("file"), storageController.createStorage);

// Get All Files/Folders/Notes
router.get("/", auth(), storageController.getAllStorage);

// Folder Tree
router.get("/tree", auth(), storageController.getFolderTree);

// Storage Usage (15 GB)
router.get("/usage", auth(), storageController.getStorageUsage);

module.exports = router;
