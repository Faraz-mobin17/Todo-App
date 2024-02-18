import express from "express";
import morgan from "morgan";
import { envVars } from "../config/serverConfig";
const app = express();
// middlewares
app.use(morgan("dev")); // middleware for logging in terminal
app.use(express.json()); // convert form data to json
app.use(express.urlencoded({ extended: true, limit: envVars.LIMIT })); // send data from form and url
app.use(express.static("public")); // use public folder for static assets

app.all("*", (req, res, next) => {
  return res.status(404).json(new ApiError(404, [], `${req.originalUrl}`));
});

export { app };
