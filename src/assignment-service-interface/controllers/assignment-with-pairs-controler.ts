
import { Request, Response, NextFunction } from "express";
import request from "request";
import * as rp from "request-promise";

import  {
    PulpAssignmentWithPairs,
    PulpAssignmentWithPairsResponse,
    PulpPairGenerationResponse
     }  from "../models";

import {
    AssignmentWithPairs
} from "../../models";
import { config } from "../conf";
import {
    assignmentWithPairstoPulpAssignmentWithPairs,
    pulpAssignmentWithPairsResponseToassignmentWithPairs,
    pulpPairGenerationResponseToDeveloperPairs
 } from "../lib";
import express from "express";
import { DeveloperPair, PairGenerationInput } from "../../models/";
import { pairGenerationInputToPulpPairGenerationInput } from "../lib";

export const routerPairAssign = express.Router();

export const routerPairGeneration = express.Router();
const base_url: string = config.taskAssignmentServiceUrl;
async function getPairs(pairGenerationInput: PairGenerationInput): Promise<DeveloperPair[]> {
    const pulpPairGenerationInput = pairGenerationInputToPulpPairGenerationInput(pairGenerationInput);
    const pulpPairsResponse = <PulpPairGenerationResponse>  await rp.post(base_url + "makepairs/", {json: pulpPairGenerationInput} );
    const developerPairs = pulpPairGenerationResponseToDeveloperPairs(pulpPairsResponse, pairGenerationInput.developers);
    return developerPairs;
}
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
                callback({"error": "The task assignment service is down"});
            }
            if (response.statusCode > 201) {
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


routerPairAssign.post("/",
    function (req: Request, res: Response) {
        getAssignmentWithPairs (req.body as AssignmentWithPairs,
            function (assignmentUniqueCost: AssignmentWithPairs) {
                res.json(assignmentUniqueCost);
            }
        );
    }
);
routerPairGeneration.post("/",
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            const pairs = await getPairs(req.body as PairGenerationInput);
            res.json(pairs);
        } catch (e) {
            next(e);
        }
    }
);
