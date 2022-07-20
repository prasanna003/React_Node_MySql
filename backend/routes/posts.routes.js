const postRouter = require("express").Router();

const multer = require("multer");

const path= require("path");

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '../public/uploads'));
     },
     filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix)
     }
})

const upload = multer({ storage: storage })

const postController = require("../controller/posts.controller");

postRouter.post("/createpost", upload.single("file"), postController.createPost);

postRouter.post("/listposts", postController.listPosts);

postRouter.post("/updatepost", postController.updatePost);

postRouter.post("/deletepost", postController.deletePost)

module.exports = postRouter;