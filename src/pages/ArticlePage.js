import React, {useState, useEffect} from 'react';
import articleContent from './article-content';
import ArticlesList from '../components/articleslist';
import CommentsList from '../components/CommentsList';
import UpvotesSection from'../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';
import NotFoundPage from './NotFoundPage';

const ArticlePage = ({match}) => {

    const name = match.params.name;

    //Find the article who's name property is equal to the nameparam

    const article = articleContent.find(article => article.name === name);

    //Importing useState gives us somewhere to store the state of a page
    //React hooks take two things, a definition of a state, eg aricleInfo
    // And a function to call to change the state's info
    //We also set two default values in useState

    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []});

    //useEffect is another react hook, giving us a place to perfomr all
    // the side effects of our commponents such as fetching data
    //and setting the state with the result
    // How it works is by calling an anonymous function when the page is loaded.
    // We need to tell useEffect when to update, by passing values for it to watch into an array arguement.
    //We want ti to update when the url changes, so we pass in the 'name' const

    useEffect(() => {

        const fetchData = async () => {

            //Make a call to the server, passing the path name we got from out url paramaters
            //Request is automatically added to the lochalhost address proxy in the
            //package.json file

            const result = await fetch(`/api/articles/${name}`);  //appended to address from package.json

            const body = await result.json();

            console.log(body);

            //Pass body in to the setArticleInfo function defined in useState()

            setArticleInfo(body);

        }

        fetchData();


    }, [name]);

    
    //if a wrong header gets type in somehow, and the article does not exist, return the NotFoundPage component

    if(!article) return <NotFoundPage/>

    // To include related articles in the nav bat at the bottom, we only want the other articles and not this one. 
    // To get the other articles, we must filter out the article who's name natches thus one.

    const otherArticles = articleContent.filter(article => article.name !== name);

    return(

    <>

        <h1> This is an {article.title}</h1>

        {/* Include the upvotes component, passing in the three arguements it requires */}

        <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}/>

        {/* Seeing as the paragrah contect is just a bunch of strings in JSON, we need
        to map it to a P element. React always want to include a Key property when mapping, so just insert a 
        blank one but don't use it. */}

        {article.content.map( (paragraph, key) => (

            <p key={key}>{paragraph}</p>

        ))}

        {/* Include the comments component and pass in the articleInfo state */}

        <CommentsList comments={articleInfo.comments}/>

        {/* Include the AddComment component and pass it the paramaters it needs for it's functionality   */}

        <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>

        {/* Include another nav bar using our modular nav bar component, showing related articles.
        This is our imported modular component, being passed a paramater of our now filtered
        article list */}

        <h3>Other Articles</h3>

        <ArticlesList articles={otherArticles} /> 

    </>

    )

    };

export default ArticlePage;