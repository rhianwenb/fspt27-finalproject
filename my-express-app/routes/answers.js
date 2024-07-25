var express = require('express');
var router = express.Router();
const db = require("../model/helper");

//Get all answers
router.get("/", async (req,res,next)=>{
    try {
        let result = await db("SELECT * FROM answers");

        res.status(200).send(result.data);
    }catch(err){
        res.status(500).send({error:err.message})
    }
})

//Get answers for a property
router.get("/property/:id", async (req,res,next)=>{

    try {
        let check = await db(`SELECT answers.*, users.UserName FROM answers
        LEFT JOIN users ON answers.UserID = users.UserID
            WHERE PropertyID=${+req.params.id}`)

        if(check.data){
            res.status(200).send(check.data);
        }
        else {
            res.status(404).send("This property has no answers to comments")
        }
    } catch(err){
        res.status(500).send({error:err.message})
    }
    
})

//Post an answer
router.post("/", async (req,res,next)=>{
    const {PropertyID, UserID, CommentID, Text} = req.body;
    const today = new Date();
    const AnswerDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    try{
        await db(`INSERT INTO answers (UserID, PropertyID, CommentID, Text, AnswerDate)
            VALUES
            ("${UserID}","${PropertyID}","${CommentID}","${Text}","${AnswerDate}")`);

        let result = await db("SELECT * FROM answers");

        res.status(200).send(result.data);
    } catch(err){
        res.status(500).send({error:err.message});
    }
})


module.exports = router;