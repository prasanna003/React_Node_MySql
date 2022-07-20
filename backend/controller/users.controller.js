const db = require("../models");
const users = db.users;
const Op = db.Sequelize.Op;

const { Validator } = require('node-input-validator');

const { encrypt, decrypt } = require("../helpers/encryption");

const authMiddleware = require("../middlewares/auth")

exports.registerUser = (req, res) => {
     try {
          const v = new Validator(req.body, {
               name: 'required',
               email: 'required|email',
               password: 'required'
          });
          v.check().then(async (matched) => {
               if (!matched) {
                    res.status(422).send(v.errors);
               }
               else {
                    const email = req.body.email;

                    var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

                    users.findOne({ where: condition }).then(data => {
                         if (data != null) {
                              res.json({ status: false, message: "User Already Exists" });
                              res.end()
                         }
                         else {
                              console.log(req.body.password, "PWD")
                              const registerData = {
                                   name: req.body.name,
                                   email: req.body.email,
                                   password: req.body.password,
                                   createdAt: new Date(),
                                   updatedAt: new Date()
                              };
                              users.create(registerData)
                                   .then(data => {
                                        res.json({ status: true, message: "Registered Successfully" });
                                        res.end()
                                   })
                                   .catch(err => {
                                        res.status(500).send({
                                             message:
                                                  err.message || "Some error occurred while creating the users."
                                        });
                                   })
                         }
                    })
                         .catch(err => {
                              res.status(500).send({
                                   message:
                                        err.message || "Some error occurred while creating the users."
                              });
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

exports.loginUser = (req, res) => {
     try {
          const v = new Validator(req.body, {
               email: 'required|email',
               password: 'required'
          });
          v.check().then(async (matched) => {
               if (!matched) {
                    res.status(422).send(v.errors);
               }
               else {
                    const email = req.body.email;

                    var condition = email ? { email: { [Op.like]: `${email}` } } : null;

                    users.findOne({ where: condition }).then(data => {
                         console.log("Data--->", data)
                         if (data) {
                              //login
                              if (data.password != req.body.password) {
                                   res.json({ status: false, message: "Incorrect Password" });
                                   res.end()
                              }
                              else {
                                   let authData = authMiddleware.createPayloadAdmin(encrypt(data.email.toString()));
                                   res.json({ status: true, message: "Logged In succesfully", origin: authData ,id:data.id});
                                   res.end()
                              }
                         }
                         else {
                              res.json({ status: false, message: "User not exists..!" })
                         }
                    })
                         .catch(err => {
                              console.log("err", err)
                              res.status(500).send({
                                   message:
                                        err.message || "Some error occurred while creating the users."
                              });
                         })
               }
          })
     }
     catch (e) {
          console.log("Error catched in user login", e);
          res.json({ status: false, message: "Something went wrong" });
          res.end()
     }
}

exports.findAllUsers = (req, res) => {
     try {
          users.findAll().then(data => {
               res.json({ status: true, message: "Users list", data: data })
          })
               .catch(err => {
                    console.log("err", err)
                    res.status(500).send({
                         message:
                              err.message || "Some error occurred while listing user list."
                    });
               })
     }
     catch (e) {
          console.log("Error in finding users data", e);
          res.json({ status: false, message: "Error in finding users list" });
          res.end()
     }
}

exports.findUserData = (req, res) => {
     try {
          const id = req.body.id;
          users.findOne({ where: id }).then(data => {
               res.json({ status: true, message: "User Details", data: data })
          })
               .catch(err => {
                    console.log("err", err)
                    res.status(500).send({
                         message:
                              err.message || "Some error occurred while listing user data."
                    });
               })
     }
     catch (e) {
          console.log("Error in finding user data", e);
          res.json({ status: false, message: "Error in finding users details" });
          res.end()
     }
}
