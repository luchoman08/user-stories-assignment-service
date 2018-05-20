import express from "express";


// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";
import * as projectManagerMiddleware from "./middleware/project-managers";
// API keys and Passport configuration
import * as passportConfig from "./config/passport";

// Create Express server
const app = express();



// Express configuration
app.set("port", process.env.PORT || 3000);

/**
 * Primary app routes.
 */

app.use("/", projectManagerMiddleware.router);



export default app;