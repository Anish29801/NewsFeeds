import React, { useState, useEffect } from 'react';

const Hero = ({ searchTerm }) => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [showTopButton, setShowTopButton] = useState(false);

    const fetchNews = async (searchValue = '') => {
        try {
            const query = searchValue
                ? `everything?q=${searchValue}&from=2024-11-05&to=2024-11-05&sortBy=popularity`
                : 'top-headlines?country=us&category=business';
            const url = `https://newsapi.org/v2/${query}&apiKey=9c847c5b0b8e4a9a8df747f64d8e73cf`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'ok' && data.articles.length > 0) {
                setArticles(data.articles.filter(article => article.title !== "[Removed]"));
                setError(null);
            } else {
                setArticles([]);
                setError('No news available at the moment.');
            }
        } catch (err) {
            console.error('Error fetching news:', err);
            setError('Error fetching news data.');
        }
    };

    useEffect(() => {
        fetchNews(searchTerm);
    }, [searchTerm]);

    return (
        <div className="news-feed">
            <div className="headlines">
                <h3 className="headline">Headlines</h3>
            </div>

            <div className="container">
                {error ? (
                    <p>{error}</p>
                ) : (
                    articles.map((article, index) => (
                        <div key={index} className="article">
                            {article.urlToImage && (
                                <img src={article.urlToImage} alt={article.title} />
                            )}
                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                            <p className="source">Source: {article.source.name}</p>
                            <p className="publishedAt">
                                Published At: {new Date(article.publishedAt).toLocaleString()}
                            </p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                Read more
                            </a>
                        </div>
                    ))
                )}
            </div>

            {showTopButton && (
                <button className="go-to-top-btn" onClick={scrollToTop}>↑</button>
            )}
        </div>
    );
};

export default Hero;
