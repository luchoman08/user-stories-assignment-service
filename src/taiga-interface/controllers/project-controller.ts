
import { Request, Response, NextFunction } from "express";
import request from "request";
import * as taigaInterface from "../lib";
import  { TaigaProject }  from "../models/";
import { SimpleProject } from "../../models/";
import { taigaProjectsToSimpleProjects } from "../lib";
import { ServerResponse } from "http";
import express from "express";
export const router = express.Router();

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

function getSimpleProjectBySlug(slug: string, callback: Function) {
    let taigaProject: TaigaProject = new TaigaProject();
    let simpleProject: SimpleProject = new SimpleProject();
    request({
            url: base_url + "/projects/by_slug",
            qs: {"slug": slug}
        },
        function (error, response, body) {
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


router.use (
    function (req: Request, res: Response, next)  {
        console.log(req.url);
    const member = req.query.member;
    const slug = req.query.slug;
    if (member) {
        getSimpleProjectsByMemberId (member,
            function (simpleProjects: SimpleProject[]) {
                res.send(simpleProjects);
            });
    }
    else if (slug) {
        console.log(slug);
        getSimpleProjectBySlug (slug,
            function (simpleProject: SimpleProject) {
                res.send(simpleProject);
            });
    }
    else {
        next();
    }
});
router.get("/:id",
    function (req: Request, res: Response, next) {
        getSimpleProject (req.params.id,
            function (simpleProjects: SimpleProject[]) {
                res.json(simpleProjects);
            }
        );
    }
);
