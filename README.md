# News Aggregator API
A RESTful API service that aggregates news from various sources based on user preferences. This service allows users to register, set their news preferences, fetch personalized news, search for articles, and save favorite articles for later reading.
## Features
- User registration and authentication
- Customizable news preferences (categories, country)
- Personalized news feed based on user preferences
- News search functionality
- Save articles for later reading
- CRUD operations for user preferences and saved articles
## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing
- News API for fetching news content
  ## API Endpoints
### Authentication
- `POST /users/signup` - Register a new user
- `POST /users/login` - Login and get authentication token
### User Preferences
- `GET /users/preferences` - Get user preferences
- `PUT /users/preferences` - Update user preference
### News
- `GET /news` - Get personalized news based on preferences
- `GET /news/search?query=keyword` - Search for news articles
  ### Saved Articles
- `POST /users/saved-articles` - Save an article
- `GET /users/saved-articles` - Get all saved articles
- `DELETE /users/saved-articles/:articleId` - Remove a saved article
