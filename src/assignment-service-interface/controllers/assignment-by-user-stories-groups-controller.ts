
import { Request, Response } from "express";
import request from "request";


import  {
    PulpAssignmentTaskGroups,
    PulpAssignmentTaskGroupsResponse
}  from "../models"; 

import {
    AssignmentByUserStoryGroups
} from "../../models";

import {
    assignmentByUserStoryGroupsToPulpAssignmentTaskGroup,
    pulpAssignmentTaskGroupResponseToAssignmentByUserStoryGroups
 } from "../lib";
import express from "express";
export const router = express.Router();

const base_url: string = "http://task-assignment:8001/api/v1/";

function getAssignmentTaskGroup (assignmentTaskGroup: AssignmentByUserStoryGroups, callback: Function) {
    let pulpAssignmentTaskGroup: PulpAssignmentTaskGroups = new PulpAssignmentTaskGroups();
    let pulpAssignmentTaskGroupResponse: PulpAssignmentTaskGroupsResponse = new PulpAssignmentTaskGroupsResponse();
    let assignmentTaskGroupResult: AssignmentByUserStoryGroups = new AssignmentByUserStoryGroups();
    pulpAssignmentTaskGroup = assignmentByUserStoryGroupsToPulpAssignmentTaskGroup(assignmentTaskGroup);
    console.log("pulpAssignmentTaskGroup", pulpAssignmentTaskGroup);
    const options = {
        uri: base_url + "groupassign/",
        method: "POST",
        json: pulpAssignmentTaskGroup
      };
    request(options ,
        function (error: any, response: any, body: any) {
        if (response.statusCode>201) {
        callback(body);
        } else {
		if ( body ) {
        pulpAssignmentTaskGroupResponse = body as PulpAssignmentTaskGroupsResponse;
        assignmentTaskGroupResult =
            pulpAssignmentTaskGroupResponseToAssignmentByUserStoryGroups(
                pulpAssignmentTaskGroupResponse,
                assignmentTaskGroup);
        callback(assignmentTaskGroupResult);
        }
        else {
        callback(error);
        }
        }
        });
    }


router.post("/",
    function (req: Request, res: Response) {
        getAssignmentTaskGroup (req.body as AssignmentByUserStoryGroups,
            function (assignmentTaskGroup: AssignmentByUserStoryGroups) {
                res.json(assignmentTaskGroup);
            }
        );
    }
);
