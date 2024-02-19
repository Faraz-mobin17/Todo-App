import express from "express";
import morgan from "morgan";
import { envVars } from "../config/serverConfig";
import cookieParser from "cookie-parser";
const app = express();
// cors
app.use(
  cors({
    origin: envVars.CROSS_ORIGIN,
    credentials: true,
  })
);
// middlewares
app.use(morgan("dev")); // middleware for logging in terminal
app.use(express.json({ limit: envVars.LIMIT })); // convert form data to json
app.use(express.urlencoded({ extended: true, limit: envVars.LIMIT })); // send data from form and url
app.use(express.static("public")); // use public folder for static assets
app.use(cookieParser());

// routes imports
import userRouter from "./routes/user.route.js";
// routes declaration

app.use("/api/v1/users", userRouter);

// page not found error handler
app.all("*", (req, res, next) => {
  return res.status(404).json(new ApiError(404, [], `${req.originalUrl}`));
});

export { app };
