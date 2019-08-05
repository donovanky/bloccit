const express = require("express");
const flairController = require("../controllers/flairController");
const router = express.Router();

router.get("/flairs", flairController.index);
router.get("/topics/:topicId/posts/:postId/flairs/new", flairController.new);
//router.get("/topics/:topicId/posts/:postId/flairs/:id", flairController.show);
router.get("/flairs/:id", flairController.show);
router.get("/flairs/:id/edit", flairController.edit);

router.post("/flairs/:id/create", flairController.create);
router.post("/flairs/:id/destroy", flairController.destroy);
router.post("/flairs/:id/update", flairController.update);

module.exports = router;
