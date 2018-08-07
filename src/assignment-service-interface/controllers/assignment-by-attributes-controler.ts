
import { Request, Response, NextFunction } from "express";
import request from "request";

import  {
    PulpAssignmentWithAttributes,
    PulpAssignmentWithAttributesResponse,
    Task
     }  from "../models"; 

import {
    AssignmentByPunctuation
} from "../../models";

import {
    assignmentWithAttributesToPulpAssignmentWithAttributes,
    pulpAssignmentWithAttributesResponseToassignementByPunctuations
 } from "../lib";
import express from "express";
export const router = express.Router();

const base_url: string = "http://task-assignment:8001/api/v1/";

function getAssignmentUniqueCost (assignmentByPunctuation: AssignmentByPunctuation, callback: Function) {
    let pulpAssignmentWithAttributes: PulpAssignmentWithAttributes = new PulpAssignmentWithAttributes();
    let pulpAssignmentWithAttributesResponse: PulpAssignmentWithAttributesResponse = new PulpAssignmentWithAttributesResponse();
    let assignmentUniqueCostResult: AssignmentByPunctuation = new AssignmentByPunctuation();
    pulpAssignmentWithAttributes = assignmentWithAttributesToPulpAssignmentWithAttributes(assignmentByPunctuation);
    console.log(JSON.stringify(pulpAssignmentWithAttributes), 'pulp assignment with attributes');
    const options = {
        uri: base_url + "attributeassign/",
        method: "POST",
        json: pulpAssignmentWithAttributes
      };
    request(options ,
        function (error, response, body) {
        if (response.statusCode>201) {
        callback(body);
        } else {
		if ( body ) {
        pulpAssignmentWithAttributesResponse = body as PulpAssignmentWithAttributesResponse;
        assignmentUniqueCostResult =
        pulpAssignmentWithAttributesResponseToassignementByPunctuations(
                pulpAssignmentWithAttributesResponse,
                assignmentByPunctuation);
                console.log(assignmentUniqueCostResult);
        callback(assignmentUniqueCostResult);
        }
        else {
        callback(error);
        }
        }
        });
    }


router.post("/",
    function (req: Request, res: Response, next) {
        getAssignmentUniqueCost (req.body as AssignmentByPunctuation,
            function (assignmentUniqueCost: AssignmentByPunctuation) {
                res.json(assignmentUniqueCost);
            }
        );
    }
);
