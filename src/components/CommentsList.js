import React from 'react';

const CommentsList = ({comments}) => (

    <>

    <h3>Comments:</h3> 

    {/* For each comment passed in, create a html comment.
    The dtata is retrieved from passing the articleInfo state into the component 
    when placed on the articles Page */}

    {comments.map((comment, key) => (

        <div className="comment" key={key}>

            <h4>{comment.username}</h4>
            <p>{comment.text}</p>

        </div>

    ))}

    </>

);

export default CommentsList;