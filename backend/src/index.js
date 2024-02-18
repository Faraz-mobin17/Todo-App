import { envVars } from "../config/serverConfig";
import { app } from "./app";
import connectDB from "./db/connections.db";

connectDB()
  .then(() => {
    app.listen(envVars.PORT || 5000, () => {
      console.log(`listening on port ${envVars.PORT}`);
    });
  })
  .catch((err) => console.log("MONGODB connection failed", err));
