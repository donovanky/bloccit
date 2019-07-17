const express = require("express");
const router = express.Router();
const TopicsController = require("../controllers/TopicsController")

router.get("/Topics", TopicsController.index);
router.get("/Topics/new", TopicsController.new);
router.get("/Topics/:id", TopicsController.show);

router.post("/Topics/create", TopicsController.create);
router.post("/Topics/:id/destroy", TopicsController.destroy);

module.exports = router;
