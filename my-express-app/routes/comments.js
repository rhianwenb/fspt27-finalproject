var express = require('express');
var router = express.Router();
const db = require("../model/helper");

//Get all comments
router.get("/", async (req,res,next)=>{
    try{
        let result = await db("SELECT * from comments");

        res.status(200).send(result.data);

    } catch(err){
        res.status(500).send({error:err.message})
    }
})

//Get comments for a property
router.get("/property/:id", async (req,res,next)=>{

    try {
        let check = await db(`SELECT comments.*, users.UserName FROM comments
        LEFT JOIN users ON comments.UserID = users.UserID
            WHERE PropertyID=${+req.params.id}`)

        if(check.data){
            res.status(200).send(check.data);
        }
        else {
            res.status(404).send("This property has no comments")
        }
    } catch(err){
        res.status(500).send({error:err.message})
    }
    
})

//Post a comment
router.post("/", async (req,res,next)=>{
    const {PropertyID, UserID, Text} = req.body;
    const today = new Date();
    const CommentDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    try{
        await db(`INSERT INTO comments (UserID, PropertyID, Text, CommentDate) 
            VALUES
            ("${UserID}", "${PropertyID}", "${Text}", "${CommentDate}")`);

        let result = await db("SELECT * FROM comments");

        res.status(200).send(result.data);

    }
    catch(err){
        res.status(500).send({error:err.message})
    }
})

module.exports = router;