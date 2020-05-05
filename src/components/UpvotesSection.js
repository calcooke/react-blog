import React from 'react';

const UpvotesSection = ({ articleName, upvotes, setArticleInfo}) => {

    const upvoteArticle = async () => {

        // Make a call to the endpoint, setting the mehod as post

        const result = await fetch(`/api/articles/${articleName}/upvote`, {
            method:'post',
        });

        const body = await result.json();
        setArticleInfo(body);

    }

    return (

        <div id="upvotes-section">

            {/* Set the click callback to call upvoteArticle() */}

            <button onClick={()=> upvoteArticle()}>Add Upvote</button>
            <p> This post has been upvoted {upvotes} times</p>

        </div>

    );

};



export default UpvotesSection;