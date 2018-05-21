
import { Request, Response, NextFunction } from "express";
import request from "request";
import * as taigaInterface from "../lib";

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
import { ServerResponse } from "http";
import express from "express";
export const router = express.Router();

const base_url: string = "http://localhost:8002/api/v1/";

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

        pulpAssignmentUniqueCostResponse = body as PulpAssignmentUniqueCostResponse;
        assignmentUniqueCostResult =
            pulpAssignmentUniqueCostResponseToassignementUniqueCost(
                pulpAssignmentUniqueCostResponse,
                assignmentUniqueCost);
        callback(assignmentUniqueCostResult);
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
