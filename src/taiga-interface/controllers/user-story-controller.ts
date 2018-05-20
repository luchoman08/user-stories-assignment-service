
import { Request, Response, NextFunction } from "express";
import request from "request";
import * as taigaInterface from "../lib";
import  { TaigaUserStory }  from "../models/TaigaUserStory";
import { SimpleUserStory } from "../../models/SimpleUserStory";
import express from "express";
export const router = express.Router();
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

router.use(
    function (req: Request, res: Response, next) {
    const projectid = req.query.project;
    if (projectid) {
        getProjectSimpleUserStories (projectid,
            function (simpleUserStories: SimpleUserStory[]) {
                res.send(simpleUserStories);
            });
    }
    else {
        next();
    }
});
router.get("/:id",
    function (req: Request, res: Response, next) {
        getSimpleStory (req.params.id,
        function (simpleUserStories: SimpleUserStory[]) {
            res.json(simpleUserStories);
        });
    }
);