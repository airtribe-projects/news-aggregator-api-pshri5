// services/news.service.js
import axios from 'axios';

class NewsService {
  constructor() {
    this.apiKey = process.env.NEWS_API_KEY;
    this.baseUrl = 'https://newsapi.org/v2';
  }

  async getNewsByPreferences(preferences) {
    const { categories = ['general'], country = 'in' } = preferences;
    
    try {
      // For each category, fetch news
      const categoryPromises = categories.map(category => 
        axios.get(`${this.baseUrl}/top-headlines`, {
          params: {
            category,
            country: country.toLowerCase().substring(0, 2),
            apiKey: this.apiKey,
            pageSize: 10
          }
        })
      );
      
      const responses = await Promise.all(categoryPromises);
      
      // Combine and deduplicate news articles
      let articles = [];
      responses.forEach(response => {
        articles = [...articles, ...response.data.articles];
      });
      
      // Remove duplicates by URL
      const uniqueArticles = Array.from(
        new Map(articles.map(article => [article.url, article])).values()
      );
      
      return uniqueArticles;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  async searchNews(query, language = 'en') {
    try {
      const response = await axios.get(`${this.baseUrl}/everything`, {
        params: {
          q: query,
          language,
          apiKey: this.apiKey,
          pageSize: 20
        }
      });
      
      return response.data.articles;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  }
}

export default new NewsService();