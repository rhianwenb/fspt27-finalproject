import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import "../styles/Comments.css"
import AuthContext from '../context/AuthContext';

export default function Comments({id}) {


    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState("");

    let auth = useContext(AuthContext);

    function getComments(){
        axios.get(`/api/comments/property/${id}`)
        .then(response=>{
            if(response.data){
                setComments(response.data)
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
            setComments(response.data);
            setNewComment("");
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

    useEffect(()=>{
        getComments()
    }, [])

  return (
    <div id="Comments">
        <p style={{textAlign:"left"}}>Questions</p>


        { comments ? 
            <div>
            {
                comments.map(c=>(
                    <div key={c.CommentID} className='comment'>
                        <p className='username'>{c.UserName}</p>
                        <p>{c.Text}</p>
                        <p className='date'>{formatDate(c.CommentDate)}</p>

                        <div style={{display:"flex", justifyContent:"left"}} className='buttonsComments'>
                            <button>Answer</button>
                            <button>See all answers</button>
                        </div>
                        
                    </div>
                ))
            }
        </div> :
            <p>There are no questions yet for this property.</p>
        }

        <form onSubmit={(event)=>postComment(event)}>
            <input type='text' value={newComment} onChange={(event)=>handleChange(event)} placeholder='Ask a question'/>
            <button>Submit</button>
        </form>
        
    </div>
  )
}
