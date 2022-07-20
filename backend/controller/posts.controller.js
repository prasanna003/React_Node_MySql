const db = require("../models");
const posts = db.posts;
const Op = db.Sequelize.Op;

const { Validator } = require('node-input-validator');

const { encrypt, decrypt } = require("../helpers/encryption");

exports.createPost = (req, res) => {

     try {
          const v = new Validator(req.body, {
               createdBy: 'required',
               description: 'required',
               comments: 'required',
          });
          v.check().then(async (matched) => {
               if (!matched) {
                    res.status(422).send(v.errors);
               }
               else {
                    console.log(req.file, "file")
                    //validation success
                    const postsData = {
                         createdBy: req.body.createdBy,
                         description: req.body.description,
                         file: req.file.path,
                         comments: req.body.comments,
                         isLiked: false,
                         createdAt: new Date(),
                         updatedAt: new Date()
                    }

                    posts.create(postsData).then((created) => {
                         res.json({ status: true, message: "Post created" });
                         res.end()
                    }).catch((err) => {
                         res.json({ status: false, message: "Unable to create post" });
                         res.end();
                    })
               }
          })
     }
     catch (e) {
          console.log("Error catched in registering user", e)
          res.json({ status: false, message: "Something Went Wrong!!!" });
          res.end()
     }
}

exports.listPosts = (req, res) => {
     try {

     } catch (error) {
          console.log("Error catched in listing post", error);
          res.json({ status: false, message: "Error catched in listing post" })
     }
}

exports.updatePost = (req, res) => {
     try {

     } catch (error) {
          console.log("Error catched in updating post", error);
          res.json({ status: false, message: "Error catched in updating post" })
     }
}

exports.deletePost = (req, res) => {
     try {

     } catch (error) {
          console.log("Error catched in deleting post", error);
          res.json({ status: false, message: "Error catched in deleting post" })
     }
}