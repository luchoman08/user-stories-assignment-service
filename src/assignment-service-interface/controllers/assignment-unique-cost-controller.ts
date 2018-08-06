
import { Request, Response, NextFunction } from "express";
import request from "request";

import  {
    PulpAssignmentUniqueCost,
    PulpAssignmentUniqueCostResponse,
    Task
     }  from "../models/"; 

import {
    AssignmentUniqueCost
} from "../../models";

import {
    assignmentUniqueCostToPulpAssignmentUniqueCost,
    pulpAssignmentUniqueCostResponseToassignementUniqueCost
 } from "../lib";
import express from "express";
export const router = express.Router();

const base_url: string = "http://task-assignment:8001/api/v1/";

function getAssignmentUniqueCost (assignmentUniqueCost: AssignmentUniqueCost, callback: Function) {
    let pulpAssignmentUniqueCost: PulpAssignmentUniqueCost = new PulpAssignmentUniqueCost();
    let pulpAssignmentUniqueCostResponse: PulpAssignmentUniqueCostResponse = new PulpAssignmentUniqueCostResponse();
    let assignmentUniqueCostResult: AssignmentUniqueCost = new AssignmentUniqueCost();
    pulpAssignmentUniqueCost = assignmentUniqueCostToPulpAssignmentUniqueCost(assignmentUniqueCost);
    const options = {
        uri: base_url + "uniquecostassign/",
        method: "POST",
        json: pulpAssignmentUniqueCost
      };
    request(options ,
        function (error, response, body) {
        if (response.statusCode>201) {
        callback(body);
        } else {
		if (body ) {
        pulpAssignmentUniqueCostResponse = body as PulpAssignmentUniqueCostResponse;
        assignmentUniqueCostResult =
            pulpAssignmentUniqueCostResponseToassignementUniqueCost(
                pulpAssignmentUniqueCostResponse,
                assignmentUniqueCost);
                console.log(assignmentUniqueCostResult);
        callback(assignmentUniqueCostResult);
        }
        else {
        callback(error);
        }
        }
        });
    }


router.post("/uniquecostassign",
    function (req: Request, res: Response, next) {
        getAssignmentUniqueCost (req.body as AssignmentUniqueCost,
            function (assignmentUniqueCost: AssignmentUniqueCost) {
                res.json(assignmentUniqueCost);
            }
        );
    }
);
