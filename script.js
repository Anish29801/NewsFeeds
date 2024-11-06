async function fetchNews(searchValue = 'popular') {
    try {
        // If no search term is provided, use a default query (e.g., top headlines)
        const query = searchValue ? `everything?q=${searchValue}&from=2024-11-05&to=2024-11-05&sortBy=popularity` : 'top-headlines?country=us&category=business';
        const url = `https://newsapi.org/v2/${query}&apiKey=9c847c5b0b8e4a9a8df747f64d8e73cf`;

        const response = await fetch(url);
        const data = await response.json();

        const newsFeed = document.getElementById('newsFeed');
        newsFeed.innerHTML = '';

        if (data.status === 'ok' && data.articles.length > 0) {
            data.articles.forEach(article => {
                if (article.title === "[Removed]") return;

                const articleDiv = document.createElement('div');
                articleDiv.className = 'article';

                articleDiv.innerHTML = `
                    ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}">` : ''}
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <p class="source">Source: ${article.source.name}</p>
                    <p class="publishedAt">Published At: ${new Date(article.publishedAt).toLocaleString()}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsFeed.appendChild(articleDiv);
            });
        } else {
            newsFeed.innerHTML = '<p>No news available at the moment.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('newsFeed').innerHTML = '<p>Error fetching news data.</p>';
    }
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
    const searchValue = document.getElementById('search-bar').value.trim();
    fetchNews(searchValue); // Trigger the news fetch with the search query
});

// Fetch initial news when the page loads
window.onload = () => fetchNews();
// Get the button
const goToTopBtn = document.getElementById("goToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
goToTopBtn.onclick = function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
