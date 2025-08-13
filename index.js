import dotenv from "dotenv"
import connectDB from "./db/index"
import app from "./app"

dotenv.config({
    path: "./env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error!", error);
})
