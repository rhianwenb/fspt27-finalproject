var express = require('express');
var router = express.Router();
const db = require("../model/helper");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const userIsLoggedIn = require("../guards/userIsLoggedIn");
const propertyMustExist = require("../guards/propertyMustExist");
const checkPropertyDB = require("../guards/checkPropertyDB");


// GET all properties listed within database 
router.get("/", async (req, res, next) => {
  try {
    const result = await db("SELECT * FROM properties;");
    res.status(200).send(result.data);
  } catch(e) {
    res.status(500).send({error: e.message});
  }
});


// GET property by ID
router.get("/:id", propertyMustExist, async (req, res, next) => {
  try {
    const result = await db(`SELECT * FROM properties WHERE PropertyID = ${req.params.id};`);
    res.status(200).send(result.data);
  } 
  catch(e) {
    res.status(500).send({error: e.message});
  }
});


// POST add a new property to the database 
router.post("/", async (req, res, next) => {
  console.log(req.body)
  const {FormattedAddress, Latitude, Longitude} = req.body

  try {
    const result = await db(`SELECT * FROM properties WHERE Latitude = ${Latitude} AND Longitude = ${Longitude}`);
    if (result.data.length === 0) {
        console.log('Propery does not exist')
        const addNewProperty = `INSERT INTO properties (FormattedAddress, Latitude, Longitude)
                                VALUES ("${FormattedAddress}", ${Latitude}, ${Longitude});`
        await db(addNewProperty); 
        const newProperty = await db(`SELECT * FROM properties WHERE Latitude = ${Latitude} AND Longitude = ${Longitude}`); 
        // send that data back as an object 
        res.status(201).send(newProperty.data);  
    } else {
      console.log('Propery already in db')
      res.status(201).send(result.data);  
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
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
