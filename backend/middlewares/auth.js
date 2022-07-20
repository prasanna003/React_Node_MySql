const jwt = require('jsonwebtoken');

const config = require("../config/db.config")

let jwtTokenAdmin = config.jwtsecretkey;

const { encrypt, decrypt } = require("../helpers/encryption")

exports.createPayloadAdmin = (key) => {
     let payload = { subject: key };
     let token = jwt.sign(payload, jwtTokenAdmin, { "expiresIn": 60 * 30 });
     return token;
}

exports.tokenMiddlewareAdmin = (req, res, next) => {
     console.log(req.headers.authorization)
     if (req.headers.authorization) {
          let token = req.headers.authorization
          if (token != null) {
               jwt.verify(token, jwtTokenAdmin, (err, payload) => {
                    console.log(payload)

                    if (payload) {
                         console.log(payload)
                         let userid = decrypt(payload.subject);
                         req.userId = userid;
                         console.log(req.userId)
                         next();
                    } else {
                         res.json({ "status": false, "message": "Unauthorized1" })
                    }
               })
          } else {
               res.json({ "status": false, "message": "Unauthorized2" })
          }
     } else {
          res.json({ "status": false, "message": "Unauthorized3" })
     }
}