import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true
}))
app.use(cookieParser())





export default app