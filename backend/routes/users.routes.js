const userRouter = require("express").Router();

const userController = require("../controller/users.controller")

userRouter.post("/registeruser", userController.registerUser);

userRouter.post("/loginuser", userController.loginUser);

userRouter.post("/findallusers", userController.findAllUsers);

userRouter.post("/finduserdata", userController.findUserData);

module.exports = userRouter;;
