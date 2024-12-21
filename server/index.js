import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import  connectdb from "./database/db.js"
import userRoute from "./routes/user_route.js"
import courseRoute from "./routes/course_route.js"
import mediaRoute from "./routes/media_route.js"
import purchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config();

const app = express();

//call database connection here
connectdb();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:`https://infinity-courses-frontend.onrender.com`,
  credentials: true
}))

//http://localhost:5173/api/v1/purchase/webhook

//apis
app.use("/api/v1/media",mediaRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/purchase",purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

