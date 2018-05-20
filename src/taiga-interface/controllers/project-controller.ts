
import { Request, Response, NextFunction } from "express";
import request from "request";
import * as taigaInterface from "../lib";
import  { TaigaProject }  from "../models/";
import { SimpleProject } from "../../models/";
import { taigaProjectsToSimpleProjects } from "../lib";
const base_url: String = "https://api.taiga.io/api/v1";
function getSimpleProject (id: number, callback: Function) {
    let taigaProject: TaigaProject = new TaigaProject();
    let simpleProject: SimpleProject = new SimpleProject();
    request(base_url + "/projects/" + id, function (error, response, body) {
        taigaProject = JSON.parse(body);
        simpleProject  = taigaInterface.taigaProjectToSimpleProject(taigaProject);
        callback(simpleProject);
        });
    }

function getSimpleProjectsByMemberId(member_id: String, callback: Function) {
    let taigaProjects: TaigaProject[] = new Array<TaigaProject>();
    let simpleProjects: SimpleProject[] = new Array<SimpleProject>();
    request({
            url: base_url + "/projects",
            qs: {"member": member_id}
        },
        function (error, response, body) {
            taigaProjects = JSON.parse(body);
            simpleProjects  = taigaInterface.taigaProjectsToSimpleProjects(taigaProjects);
            callback(simpleProjects);
        });
    }

export let projectEndpoint = (req: Request, res: Response) => {
    const member = req.query.member;
    if (!member) {
        getSimpleProject (req.params.id,
            function (simpleProjects: SimpleProject[]) {
                res.json(simpleProjects);
            });
    }
    else {
        getSimpleProjectsByMemberId (member,
            function (simpleProjects: SimpleProject[]) {
                res.send(simpleProjects);
            });
    }
};