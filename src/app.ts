import express from "express";


// Controllers (route handlers)

import * as assignmentController from "./assignment-service-interface/controllers/assignment-unique-cost-controller";
import * as assignmentByAttribute from "./assignment-service-interface/controllers/assignment-by-attributes-controler";
import * as assignmentByUserStoryGroups from "./assignment-service-interface/controllers/assignment-by-user-stories-groups-controller";
import * as assignmentByPairs from "./assignment-service-interface/controllers/assignment-with-pairs-controler";

// API keys and Passport configuration


// Create Express server
const app = express();

app.use(express.json());


// Express configuration
app.set("port", process.env.PORT || 3001);

/**
 * Primary app routes.
 */
app.use("/uniquecostassign", assignmentController.router);
app.use("/attributeassign", assignmentByAttribute.router);
app.use("/groupassign", assignmentByUserStoryGroups.router);
app.use("/pairassign", assignmentByPairs.routerPairAssign);
app.use("/makepairs", assignmentByPairs.routerPairGeneration);
export default app;
