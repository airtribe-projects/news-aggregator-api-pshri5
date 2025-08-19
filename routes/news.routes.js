// routes/news.routes.js
import { Router } from "express";
import { getNews, searchNews } from "../controllers/news.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/", verifyJWT, getNews);

router.get("/search", verifyJWT, searchNews);

export default router;