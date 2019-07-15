const express = require("express");
const router = express.Router();

const TopicsController = require("../controllers/TopicsController")

router.get("/Topics", TopicsController.index);

module.exports = router;
