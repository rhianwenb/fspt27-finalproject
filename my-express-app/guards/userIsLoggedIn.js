var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;


function userIsLoggedIn(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Please provide a valid token!" });
    }
  
    const token = authHeader.replace(/^Bearer\s/, "");
    if (!token) {
      return res.status(401).send({ message: "Please provide a token!" });
    }
  
    jwt.verify(token, supersecret, function(err, decoded) {
      if (err) {
        return res.status(401).send({ message: err.message });
      } else {
        req.UserID = decoded.UserID;
        next();
      }
    });
  };
  

module.exports = userIsLoggedIn;