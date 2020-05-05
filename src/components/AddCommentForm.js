import React, {useState} from 'react';


const AddCommentForm =({articleName, setArticleInfo}) =>{

    //When setting a default value, the default value for a string is blank
    //Match these to the corresponding text fileds
    // by icluding a "value" property in them

    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () =>{

        console.log(username);

        //articlename is passed into this function as a arguement

        const result = await fetch(`/api/articles/${articleName}/add-comment`, {

            method: 'post',
            //JSONstringify turns the JSON into a string that the server can parse
            // these must match the name values exavtly on the server
            // You can't have userName here and username on the server
            body: JSON.stringify({username, text: commentText}),
            //When sending Post requestswith a JSON body to the server, we need to include a header
            //This tells the server what type of data we're parsing along, and allows it to parse our request body correctly
            headers:{
                'Content-Type': 'application/json'
            }

        });

        const body = await result.json();

        console.log(body);

        //setArticleInfo is a function that has been passed into this component as a property

        setArticleInfo(body);

        //Reset text fields
        setUsername('');
        setCommentText('');



    }

    return(

        <div id="add-comment-form">

            <h3>Add a comment</h3>

            <label>
                Name:
                {/* Username state is binded to this text input through the value
                Update the userName state whenever there's a change */}
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/> 
            </label>

            <label>
                Comment:
                <textarea rows="4"cols ="50" value={commentText} onChange={(event) => setCommentText(event.target.value)}/>
            </label>

            <button onClick={() => addComment()}>Add Comment</button>

        </div>

)}

export default AddCommentForm;