import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import "../styles/Comments.css"
import AuthContext from '../context/AuthContext';

export default function Comments({id}) {


    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState("");
    const [answers, setAnswers] = useState();
    const [input, setInput] = useState("question");
    const [commentID, setCommentID] = useState();

    let auth = useContext(AuthContext);

    function getComments(){
        axios.get(`/api/comments/property/${id}`)
        .then(response=>{
            if(response.data){
                setComments(response.data)
            }
        })
    }

    function getAnswers(){
        axios.get(`/api/answers/property/${id}`)
        .then(response=>{
            if(response.data){
                setAnswers(response.data)
            }
        })
    }

    function postComment(event){

        event.preventDefault();

       axios.post("/api/comments/", {
            PropertyID : Number(id),
            UserID : auth.currentUser.UserID,
            Text: newComment
       })
       .then(response=>{
            getComments()
            setNewComment("");
       })

    }

    function postAnswer(event, IDComment){
        event.preventDefault();

        axios.post("/api/answers/", {
            PropertyID : Number(id),
            UserID : auth.currentUser.UserID,
            Text: newComment,
            CommentID : IDComment
        })
        .then(response=>{
            getAnswers();
            setNewComment("");
            setCommentID();
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    function formatDate(strDate){
        let date = new Date(strDate)
        return date.toDateString()
    }

    function handleChange(event){
        let value = event.target.value;

        setNewComment(value);
    }

    function answerQuestionButton(event, IDComment){
        event.preventDefault();

        //Change input
        setInput("answer")
        //Change CommentID
        setCommentID(IDComment);
        setNewComment("");
    }

    function askAQuestionButton(event){
        event.preventDefault();

        setInput("question")
        setCommentID();
        setNewComment("");
    }


    useEffect(()=>{
        getComments();
        getAnswers()
    }, [])

  return (
    <div id="Comments">
        <p style={{textAlign:"left"}}>Questions</p>


        { comments ? 
            <div>
            {
                comments.map(c=>(
                    <div key={c.CommentID} className='containerQuestions'>
                        <div className='comment' style={c.CommentID===commentID? {backgroundColor:"#FF9900"}:{}}>
                            <p className='username'>{c.UserName}</p>
                            <p>{c.Text}</p>
                            <p className='date'>{formatDate(c.CommentDate)}</p>

                            <div style={{display:"flex", justifyContent:"left"}} className='buttonsComments'>
                                <button onClick={(event)=>answerQuestionButton(event,c.CommentID)} >Answer</button>
                                {/* <button>See all answers</button> */}
                        </div>
                        </div>
                        {answers.filter(a=>a.CommentID===c.CommentID).map(a=>(
                            <div key={a.AnswerID} className='answer'>
                                <p className='username'>{a.UserName}</p>
                                <p>{a.Text}</p>
                                <p className='date'>{formatDate(a.AnswerDate)}</p>
                            </div>
                        ))}

                        
                        
                    </div>
                ))
            }
        </div> :
            <p>There are no questions yet for this property.</p>
        }


        { input==="question" &&

            <form onSubmit={(event)=>postComment(event)}>
            <input type='text' value={newComment} onChange={(event)=>handleChange(event)} placeholder='Ask a question'/>
            <button>Submit</button>
            </form>
        }

        {   input==="answer" &&

            <form onSubmit={(event)=> postAnswer(event, commentID)}>
            <input type='text' value={newComment} onChange={(event)=>handleChange(event)} placeholder='Answer the question in orange'/>
            <button type='submit'>Submit</button>
            <button style={{marginTop:"20px", backgroundColor:"#aaaaaa"}}
            type="button"
                onClick={(event)=>askAQuestionButton(event)}
            >Ask a question</button>
            </form>

        }
        
        
    </div>
  )
}
