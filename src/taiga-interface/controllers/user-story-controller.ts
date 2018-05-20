
import { Request, Response, NextFunction } from "express";
import request from "request";
import * as taigaInterface from "../lib";
import  { TaigaUserStory }  from "../models/TaigaUserStory";
import { SimpleUserStory } from "../../models/SimpleUserStory";
const base_url: String = "https://api.taiga.io/api/v1";
function getSimpleStory (id: number, callback: Function) {
    let taigaUserStory: TaigaUserStory = new TaigaUserStory();
    let simpleUserStory: SimpleUserStory = new SimpleUserStory();
    request(base_url + "/userstories/" + id, function (error, response, body) {
        taigaUserStory = JSON.parse(body);
        simpleUserStory  = taigaInterface.taigaStoryToSimpleUserStory(taigaUserStory);
        callback(simpleUserStory);
        });
    }

function getProjectSimpleUserStories(project_id: String, callback: Function) {
    let taigaUserStories: TaigaUserStory[] = new Array<TaigaUserStory>();
    let simpleUserStories: SimpleUserStory[] = new Array<SimpleUserStory>();
    request({
            url: base_url + "/userstories",
            qs: {"project": project_id}
        },
        function (error, response, body) {
        taigaUserStories = JSON.parse(body);
        simpleUserStories  = taigaInterface.taigaStoriesToSimpleUserStories(taigaUserStories);
        callback(simpleUserStories);
        });
    }

export let userStoryEndpoint = (req: Request, res: Response) => {
    const projectid = req.query.project;
    if (!projectid) {
        getSimpleStory (req.params.id,
            function (simpleUserStories: SimpleUserStory[]) {
                res.json(simpleUserStories);
            });
    }
    else {
        getProjectSimpleUserStories (projectid,
            function (simpleUserStories: SimpleUserStory[]) {
                res.send(simpleUserStories);
            });
    }
};