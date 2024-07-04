var express = require('express');
var router = express.Router();
const db = require("../model/helper");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var bcrypt = require("bcrypt");
const userIsLoggedIn = require("../guards/userIsLoggedIn");
const userMustExist = require("../guards/userMustExist");
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

/* GET users listing. */
router.get("/all", async (req, res, next) => {
  try {
    const result = await db("SELECT * FROM users");
    res.status(200).send(result.data);
  } catch(e) {
    res.status(500).send({error: e.message});
  }
});

// GET individual user by id
router.get("/:id", userMustExist, async (req, res, next) => {
  try {
    const result = await db(`SELECT * FROM users WHERE UserID = ${req.params.id}`);
    res.status(200).send(result.data);
  }
  catch (e) {
    res.status(500).send({error: e.message});
  };
});


// POST add a new user to the database
router.post("/register", async (req, res, next) => {
  // receive values for columns to populate database
  const { FirstName, LastName, UserName, EmailAddress, 
    Password, Age, Type } = req.body;
  // secure the password
  const hash = await bcrypt.hash(Password, saltRounds);
  // sql query to insert values into new db entry
  const addNewUser = `INSERT INTO users (FirstName, LastName, UserName, EmailAddress, Password, Age, Type) 
  VALUES ("${FirstName}", "${LastName}", "${UserName}", "${EmailAddress}", "${hash}", "${Age}", "${Type}")`;
  try {
    // run sql query
    await db(addNewUser); 
    // lookup users in decending order by id and return one entry from bottom of list (will be the newest entry)
    const result = await db("SELECT * FROM users AS new_user ORDER BY UserID DESC LIMIT 1"); 
    // send that data back as an object 
    res.status(201).send(result.data);  
  }
  catch (e) {
    res.status(500).send({error: e.message});
  };
});


// existing user login 
router.post("/login", userMustExist, async (req, res) => {
  const {UserName, EmailAddress, Password} = req.body;
  try {
    const results = await db(
      `SELECT * FROM users WHERE UserName = "${UserName}" OR EmailAddress = "${EmailAddress}" `
    );
    const existingUser = results.data[0];
    if (existingUser) {
      const userId = existingUser.UserId;
      const correctPassword = await bcrypt.compare(Password, existingUser.Password);
      if (!correctPassword) throw new Error("Incorrect Password.");
      var token = jwt.sign({userId}, supersecret);
      res.send({message: "Login successful, here is your token", token})
    } else {
      throw new Error("User does not exist");
    }
  } catch (e) {
    res.status(400).send({message: e.message});
  }
});



// PUT update an existing user record in the database 
router.put("/:id", userIsLoggedIn, async (req, res, next) => {
  // receive values for columns to populate database
  const { FirstName, LastName, UserName, EmailAddress, 
    Password, Age, Type } = req.body;
  // sql query to insert values into db entry
  const updateUser = `UPDATE users(FirstName, LastName, UserName, EmailAddress, Password, Age, Type) 
  VALUES ("${FirstName}", "${LastName}", "${UserName}", "${EmailAddress}", "${Password}", "${Age}", "${Type}")
   WHERE id = ${req.params.id})`;
  try {
    // run sql query
    await db(updateUser); 
    // lookup single entry from ID
    const result = await db(`SELECT * FROM users WHERE id = ${req.params.id}`); 
    // send that data back as an object 
    res.status(201).send(result.data);  
  }
  catch (e) {
    res.status(500).send({error: e.message});
  };
});


module.exports = router;
