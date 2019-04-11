
import { Request, Response } from "express";
import request from "request";

import  {
    PulpAssignmentWithPairs,
    PulpAssignmentWithPairsResponse
     }  from "../models"; 

import {
    AssignmentWithPairs 
} from "../../models";
import { config } from "../conf";
import {
    assignmentWithPairstoPulpAssignmentWithPairs,
    pulpAssignmentWithPairsResponseToassignmentWithPairs
 } from "../lib";
import express from "express";
export const router = express.Router();

const base_url: string = config.taskAssignmentServiceUrl;

function getAssignmentWithPairs (assignmentWithPairs: AssignmentWithPairs, callback: Function) {
    let pulpAssignmentWithPairs = new PulpAssignmentWithPairs();
    let pulpAssignmentWithPairsResponse: PulpAssignmentWithPairsResponse = new PulpAssignmentWithPairsResponse();
    let assignmentPairResult: AssignmentWithPairs = new AssignmentWithPairs();
    pulpAssignmentWithPairs = assignmentWithPairstoPulpAssignmentWithPairs(assignmentWithPairs);
    const options = {
        uri: base_url + "pairassign/",
        method: "POST",
        json: pulpAssignmentWithPairs
      };
    request(options ,
        function (error: any, response: any, body: any) {
            if ( !response ) {
                callback({'error': 'The task assignment service is down'})
            }
            if (response.statusCode>201) {
                callback(body);
            } else {
                if ( body ) {
                pulpAssignmentWithPairsResponse = body as PulpAssignmentWithPairsResponse;
                assignmentPairResult =
                pulpAssignmentWithPairsResponseToassignmentWithPairs(
                        pulpAssignmentWithPairsResponse,
                        assignmentWithPairs);
                callback(assignmentPairResult);
            } 
            else {
                callback(error);
            }
            }
        });
    }


router.post("/",
    function (req: Request, res: Response) {
        getAssignmentWithPairs (req.body as AssignmentWithPairs,
            function (assignmentUniqueCost: AssignmentWithPairs) {
                res.json(assignmentUniqueCost);
            }
        );
    }
);
