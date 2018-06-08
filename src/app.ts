import express from "express";


// Controllers (route handlers)

import * as assignmentController from "./assignment-service-interface/controllers/assignment-unique-cost-controller";
// API keys and Passport configuration
 

// Create Express server 
const app = express();

app.use(express.json());


// Express configuration
app.set("port", process.env.PORT || 3001);

/**
 * Primary app routes.
 */

app.use("/", assignmentController.router);



export default app;
