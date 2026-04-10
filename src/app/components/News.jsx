import React, { useEffect } from "react";
import { useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);
  useEffect(() => {
    fetchNews();
  }, [articleNum]);
  const fetchNews = async () => {
    const response = await fetch(
      "https://saurav.tech/NewsAPI/everything/cnn.json",
    )
      .then((res) => res.json())
      .then((data) => setNews(data.articles.slice(0, articleNum)))
      .catch((err) => console.error("Error fetching news:", err));
    console.log("Fetched news:", news);
  };

  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2">
      <h4 className="text-xl font-bold mb-4">Latest News</h4>
      {news.length > 0 ? (
        news.slice(0, articleNum).map((article, index) => (
          <div className="border-b border-gray-200 py-4" key={article.url}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <div>
                <h6 className="text-lg font-semibold">{article.title}</h6>
                <p className="text-xs font-medium text-gray-500">
                  {article.source.name}
                </p>
              </div>
              <img
                src={article.urlToImage}
                
                width={70}
                className="rounded-xl"
              />
            </a>
          </div>
        ))

      ) : (
        <p>No news available</p>
      )}
      <button onClick={() => setArticleNum((prev) => prev + 3)} className="text-blue-500 hover:underline">
        Load More
      </button>
    </div>
  );
}
