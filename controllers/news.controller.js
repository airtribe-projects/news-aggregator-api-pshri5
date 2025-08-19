// controllers/news.controller.js
import NewsService from '../services/news.service.js';
import User from '../models/user.model.js';

// Get news based on user preferences
export const getNews = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user preferences
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Fetch news based on preferences
    const articles = await NewsService.getNewsByPreferences(user.preferences);
    
    return res.status(200).json({
      success: true,
      news: articles
    });
  } catch (error) {
    console.error("Get news error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch news",
      error: error.message
    });
  }
};

// Search for news
export const searchNews = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }
    
    const articles = await NewsService.searchNews(query);
    
    return res.status(200).json({
      success: true,
      news: articles
    });
  } catch (error) {
    console.error("Search news error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search news",
      error: error.message
    });
  }
};