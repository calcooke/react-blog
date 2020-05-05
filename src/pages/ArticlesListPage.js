import React from 'react';
import articleContent from './article-content'
import ArticlesList from '../components/articleslist';

const ArticlesListPage = () => (

    <>

        <h1> Articles</h1>

        {/* Place the now modular ArticleList compoent here, and pass the article content as a paramater */}

        <ArticlesList articles={articleContent} />

    </>

);

export default ArticlesListPage;