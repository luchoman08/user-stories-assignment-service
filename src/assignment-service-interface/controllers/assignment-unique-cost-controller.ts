
import { Request, Response } from "express";
import request from "request";

import  {
    PulpAssignmentUniqueCost,
    PulpAssignmentUniqueCostResponse
}  from "../models";

import {
    AssignmentUniqueCost
} from "../../models";
import { config } from "../conf";
import {
    assignmentUniqueCostToPulpAssignmentUniqueCost,
    pulpAssignmentUniqueCostResponseToassignementUniqueCost
 } from "../lib";
import express from "express";
export const router = express.Router();

const base_url: string = config.taskAssignmentServiceUrl;

function getAssignmentUniqueCost (assignmentUniqueCost: AssignmentUniqueCost, callback: Function) {
    let pulpAssignmentUniqueCost: PulpAssignmentUniqueCost = new PulpAssignmentUniqueCost();
    let pulpAssignmentUniqueCostResponse: PulpAssignmentUniqueCostResponse = new PulpAssignmentUniqueCostResponse();
    let assignmentUniqueCostResult: AssignmentUniqueCost = new AssignmentUniqueCost();
    pulpAssignmentUniqueCost = assignmentUniqueCostToPulpAssignmentUniqueCost(assignmentUniqueCost);
    console.log(JSON.stringify(pulpAssignmentUniqueCost), "asignacion unico costo de pulp");
    const options = {
        uri: base_url + "uniquecostassign/",
        method: "POST",
        json: pulpAssignmentUniqueCost
      };
    request(options ,
        function (error: any, response: any, body: any) {
        if (response.statusCode > 201) {
        callback(body);
        } else if ( body ) {
        pulpAssignmentUniqueCostResponse = body as PulpAssignmentUniqueCostResponse;
        assignmentUniqueCostResult =
            pulpAssignmentUniqueCostResponseToassignementUniqueCost(
                pulpAssignmentUniqueCostResponse,
                assignmentUniqueCost);
        callback(assignmentUniqueCostResult);
        }
        else {
        callback(error);
        }
        });
    }


router.post("/",
    function (req: Request, res: Response) {
        getAssignmentUniqueCost (req.body as AssignmentUniqueCost,
            function (assignmentUniqueCost: AssignmentUniqueCost) {
                res.json(assignmentUniqueCost);
            }
        );
    }
);
