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

dotenv.config();//Loads configuration from a .env file, allowing the use of process.env to access environment variables.

const app = express(); //Initializes an Express application.

//call database connection here
connectdb(); //Invokes a custom function to connect to the database (implementation likely in ./database/db.js).

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
//Middleware to parse incoming JSON requests. Essential for APIs handling JSON data.
app.use(cookieParser());
//Middleware to parse cookies, making them accessible via req.cookies.
app.use(cors({
  // origin:`https://infinity-courses-frontend.onrender.com`,
  origin:`http://localhost:5173`,

  credentials: true
}))
// Configures CORS to allow requests from a specific origin (replace "the frontend url" with the actual URL of your frontend).
// credentials: true ensures cookies, authorization headers, or TLS credentials are included in requests.


//apis
app.use("/api/v1/media",mediaRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/purchase",purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//The server listens on the port defined in the .env file (process.env.PORT). If not specified, it defaults to 3000.
// Logs a message to indicate the server is running.
