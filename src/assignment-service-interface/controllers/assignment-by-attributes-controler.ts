
import { Request, Response } from "express";
import request from "request";

import {
    PulpAssignmentWithAttributes,
    PulpAssignmentWithAttributesResponse
} from "../models";

import {
    AssignmentByPunctuation
} from "../../models";
import { config } from "../conf";
import {
    assignmentWithAttributesToPulpAssignmentWithAttributes,
    pulpAssignmentWithAttributesResponseToassignementByPunctuations
} from "../lib";
import express from "express";
export const router = express.Router();

const base_url: string = config.taskAssignmentServiceUrl;

function getAssignmentUniqueCost(assignmentByPunctuation: AssignmentByPunctuation, callback: Function) {
    let pulpAssignmentWithAttributes: PulpAssignmentWithAttributes = new PulpAssignmentWithAttributes();
    let pulpAssignmentWithAttributesResponse: PulpAssignmentWithAttributesResponse = new PulpAssignmentWithAttributesResponse();
    let assignmentUniqueCostResult: AssignmentByPunctuation = new AssignmentByPunctuation();
    pulpAssignmentWithAttributes = assignmentWithAttributesToPulpAssignmentWithAttributes(assignmentByPunctuation);
    console.log(JSON.stringify(pulpAssignmentWithAttributes), "pulp assignment with attributes");
    const options = {
        uri: base_url + "attributeassign/",
        method: "POST",
        json: pulpAssignmentWithAttributes
    };
    request(options,
        function (error: any, response: any, body: any) {
            if (response.statusCode > 201) {
                callback(body);
            } else if (body) {
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
        });
    }


router.post("/",
    function (req: Request, res: Response) {
        getAssignmentUniqueCost(req.body as AssignmentByPunctuation,
            function (assignmentUniqueCost: AssignmentByPunctuation) {
                res.json(assignmentUniqueCost);
            }
        );
    }
);
