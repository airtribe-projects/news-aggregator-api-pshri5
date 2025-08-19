// app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import newsRoutes from './routes/news.routes.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/users', userRoutes);
app.use('/news', newsRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('News Aggregator API is running');
});

export default app;