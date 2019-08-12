const express = require("express");
const postController = require("../controllers/postController");
const validation = require("./validation");
const router = express.Router();


router.get("/topics/:topicId/posts/new", postController.new);
router.get("/topics/:topicId/posts/:id", postController.show);
router.get("/topics/:topicId/posts/:id/edit", postController.edit);

router.post("/topics/:topicId/posts/create", validation.validatePosts, postController.create);
router.post("/topics/:topicId/posts/:id/update", validation.validatePosts, postController.update);
router.post("/topics/:topicId/posts/:id/destroy", postController.destroy);

module.exports = router;
