var express = require('express');
var router = express.Router();
const db = require("../model/helper");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const userIsLoggedIn = require("../guards/userIsLoggedIn");
const propertyMustExist = require("../guards/propertyMustExist");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});


// GET all properties listed within database 
router.get("/all", async (req, res, next) => {
  try {
    const result = await db("SELECT * FROM properties");
    res.status(200).send(result.data);
  } catch(e) {
    res.status(500).send({error: e.message});
  }
});


// GET property by ID
router.get("/:id", propertyMustExist, async (req, res, next) => {
  try {
    const result = await db(`SELECT * FROM properties WHERE PropertyID = ${req.params.id}`);
    res.status(200).send(result.data);
  } 
  catch(e) {
    res.status(500).send({error: e.message});
  }
});


// POST add a new property to the database 
router.post("/", async (req, res, next) => {
  // receive values for columns to populate database
  const { PropertyName, AddressLine1, AddressLine2, AddressLine3, 
    Town, City, County, State, PostCode } = req.body;
  // sql query to insert values into new db entry
  const addNewProperty = `INSERT INTO properties (PropertyName,
    AddressLine1, AddressLine2, AddressLine3,
    Town, City, County, State, PostCode) VALUES (
    "${PropertyName}", "${AddressLine1}", "${AddressLine2}", "${AddressLine3}",
    "${Town}", "${City}", "${County}", "${State}", "${PostCode}")`;
  try {
    // run sql query
    await db(addNewProperty); 
    // lookup properties in decending order by id and return one entry from bottom of list (will be the newest entry)
    const result = await db("SELECT * FROM properties AS latest_property ORDER BY PropertyID DESC LIMIT 1"); 
    // send that data back as an object 
    res.status(201).send(result.data);  
  }
  catch (e) {
    res.status(500).send({error: e.message});
  };
});


// PUT update an existing property in the database 
router.put("/:id", propertyMustExist, userIsLoggedIn, async (req, res, next) => {
  // receive values for columns to populate database
  const { PropertyName, AddressLine1, AddressLine2, AddressLine3, 
    Town, City, County, State, PostCode } = req.body;
  // sql query to insert values into db entry
  const updateProperty = `UPDATE properties (PropertyName,
    AddressLine1, AddressLine2, AddressLine3,
    Town, City, County, State, PostCode) VALUES (
    "${PropertyName}", "${AddressLine1}", "${AddressLine2}", "${AddressLine3}",
    "${Town}", "${City}", "${County}", "${State}", "${PostCode}" WHERE id = ${req.params.id})`;
  try {
    // run sql query
    await db(updateProperty); 
    // lookup single entry from ID
    const result = await db(`SELECT * FROM properties WHERE id = ${req.params.id}`); 
    // send that data back as an object 
    res.status(201).send(result.data);  
  }
  catch (e) {
    res.status(500).send({error: e.message});
  };
});


module.exports = router;
