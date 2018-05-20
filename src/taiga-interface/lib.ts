import {
    TaigaUserStory,
    TaigaMembership,
    TaigaMilestone,
    TaigaProject
} from "./models";
import {
    SimpleDeveloper,
    SimpleUserStory,
    SimpleProject,
    SimpleSprint
} from "../models/";

export function taigaProjectToSimpleProject(
    taigaProject: TaigaProject): SimpleProject {
        const simpleProject: SimpleProject = new SimpleProject();
        simpleProject.id = taigaProject.id;
        simpleProject.description = taigaProject.description;
        simpleProject.name = taigaProject.name;
        simpleProject.created_date = taigaProject.created_date;
        return simpleProject;
    }

export function taigaProjectsToSimpleProjects(
    taigaMilestones: TaigaProject[]): SimpleProject[] {
        return taigaMilestones.map(taigaProjectToSimpleProject);
    }

export function taigaMembershipToSimpleDeveloper(
    taigaMembership: TaigaMembership): SimpleDeveloper {
        const simpleDeveloper: SimpleDeveloper = new SimpleDeveloper();
        simpleDeveloper.id = taigaMembership.id;
        simpleDeveloper.color = taigaMembership.color;
        simpleDeveloper.full_name = taigaMembership.full_name;
        simpleDeveloper.role_name = taigaMembership.role_name;
        return simpleDeveloper;
    }

export function taigaMembershipsToSimpleDevelopers(
    taigaMemberships: TaigaMembership[]): SimpleDeveloper[] {
        return taigaMemberships.map(taigaMembershipToSimpleDeveloper);
    }

export function taigaStoryToSimpleUserStory(
    taigaUserStory: TaigaUserStory): SimpleUserStory {
    const simpleUserStory: SimpleUserStory = new SimpleUserStory();
    simpleUserStory.id = taigaUserStory.id;
    simpleUserStory.subject = taigaUserStory.subject;
    return simpleUserStory;

}

export function taigaStoriesToSimpleUserStories(
    taigaUserStories: TaigaUserStory[]): SimpleUserStory[] {
        return taigaUserStories.map(taigaStoryToSimpleUserStory);
    }

    export function taigaMilestoneToSimpleSprint(
        taigaMilestone: TaigaMilestone): SimpleSprint {
            const sprint: SimpleSprint = new SimpleSprint();
            sprint.id = taigaMilestone.id;
            sprint.name = taigaMilestone.name;
            sprint.user_stories = taigaStoriesToSimpleUserStories(taigaMilestone.user_stories);
            sprint.estimated_start = taigaMilestone.estimated_start;
            sprint.estimated_finish = taigaMilestone.estimated_finish;
            return sprint;
        }

    export function taigaMilestonesToSimpleSprints(
        taigaMilestones: TaigaMilestone[]): SimpleSprint[] {
            return taigaMilestones.map(taigaMilestoneToSimpleSprint);
        }
