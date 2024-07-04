var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const userIsLoggedIn = require("../guards/userIsLoggedIn");

// GET all reviews 
router.get("/all", async (req, res, next) => {
    try {
      const result = await db("SELECT * FROM reviews");
      res.status(200).send(result.data);
    } catch(e) {
      res.status(500).send({error: e.message});
    }
  });


//GET review by ReviewID  
router.get("/:id", async (req, res, next) => {
  try {
    const result = await db(`SELECT * FROM reviews WHERE ReviewID = ${req.params.id}`);
    res.status(200).send(result.data);
  }
  catch (e) {
    res.status(500).send({error: e.message});
  };
});


// POST
router.post("/", async (req, res, next) => {
  // receive values for columns to populate database
  const { UserID, PropertyID, ReviewDate, Rating1, Rating2, Rating3, 
    Rating4, Rating5, Rating6, Comments } = req.body;
  // sql query to insert values into new db entry
  const addNewReview = `INSERT INTO reviews (UserID, PropertyID, ReviewDate, Rating1, Rating2, Rating3, Rating4, Rating5, Rating6, Comments) 
  VALUES ("${UserID}", "${PropertyID}", "${ReviewDate}", "${Rating1}", "${Rating2}", "${Rating3}", "${Rating4}", "${Rating5}", "${Rating6}", "${Comments}")`;
  try {
    // run sql query
    await db(addNewReview); 
    // lookup reviews in decending order by id and return one entry from bottom of list (should be the newest entry)
    const result = await db("SELECT * FROM reviews AS new_review ORDER BY ReviewID DESC LIMIT 1"); 
    res.status(201).send(result.data);  
  }
  catch (e) {
    res.status(500).send({error: e.message});
  };
});


// PUT update an existing review in the database 
router.put("/:id", userIsLoggedIn, async (req, res, next) => {
    // receive values for columns to populate database
    const { UserID, PropertyID, ReviewDate, Rating1, Rating2, Rating3, 
        Rating4, Rating5, Rating6, Comments } = req.body;
    // sql query to insert values into db entry
    const updateReview = `UPDATE reviews (UserID, PropertyID, ReviewDate, Rating1, Rating2, Rating3, Rating4, Rating5, Rating6, Comments) VALUES ("${UserID}", "${PropertyID}", "${ReviewDate}", "${Rating1}", "${Rating2}", "${Rating3}", "${Rating4}", "${Rating5}", "${Rating6}", "${Comments}" WHERE id = ${req.params.id})`;
    try {
      // run sql query
      await db(updateReview); 
      // lookup single entry from ID
      const result = await db(`SELECT * FROM reviews WHERE id = ${req.params.id}`); 
      // send that data back as an object 
      res.status(201).send(result.data);  
    }
    catch (e) {
      res.status(500).send({error: e.message});
    };
  });

  
module.exports = router;
