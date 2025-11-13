const express = require("express");
const auth = require("../../middlewares/auth");
const { createAboutController, updateAboutController, deleteAboutController, getAboutController } = require("../../controllers/about.controller");

const router = express.Router();

router.route("/create").post(auth("admin"), createAboutController);
router.route("/:id").put(auth("admin"), updateAboutController);
router.route("/:id").delete(auth("admin"), deleteAboutController);
router.route("/").get(auth( "admin"), getAboutController);

module.exports = router;
