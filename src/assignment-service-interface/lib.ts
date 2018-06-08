import {
    PulpAssignmentUniqueCost,
    Task,
    Agent,
    PulpAssignmentUniqueCostResponse
 } from "./models/";

import {
    AssignmentUniqueCost,
    Developer,
    UserStory
     } from "../models/";

export function assignmentUniqueCostToPulpAssignmentUniqueCost(
    assignmentUniqueCost: AssignmentUniqueCost): PulpAssignmentUniqueCost {
        const pulpAssignmentUniqueCost: PulpAssignmentUniqueCost = new PulpAssignmentUniqueCost();
        pulpAssignmentUniqueCost.agents =
            developersToAgents(
                assignmentUniqueCost.developers,
                assignmentUniqueCost.startDate,
                assignmentUniqueCost.endDate);
        pulpAssignmentUniqueCost.tasks = userStoriesToTasks(assignmentUniqueCost.userStories, assignmentUniqueCost.relationHoursPoints);
        return pulpAssignmentUniqueCost;
    }

export function pulpAssignmentUniqueCostResponseToassignementUniqueCost(
    pulpAssignmentUniqueCostResponse: PulpAssignmentUniqueCostResponse,
    assignmentUniqueCost: AssignmentUniqueCost
): AssignmentUniqueCost {
    for (const id_agent in pulpAssignmentUniqueCostResponse) {
        for (const idUserStory of pulpAssignmentUniqueCostResponse[id_agent]) {
        console.log(assignmentUniqueCost.userStories, "historias de usuario desde pulpassignment conv");
        console.log(idUserStory, "Id historia de usuario desde pulp conv");
            assignmentUniqueCost.userStories.find(userStory => Number(userStory.id) === Number(idUserStory)).assigned_to = id_agent;
        }
    }
    return assignmentUniqueCost;
}

export function userStoryToTask(userStory: UserStory, relationHoursPoints: number): Task {
    const task = new Task();
    task.external_id = userStory.id;
    task.cost = userStory.total_points  * relationHoursPoints;
    return task;
}

export function developerToAgent(
    developer: Developer,
    workStartDate: Date,
    workEndDate: Date): Agent {

    const agent: Agent = new Agent();
    agent.external_id = developer.id;
    agent.capacity = developer.available_hours_per_week / 5 * getBusinessDatesCount(workStartDate, workEndDate);
    console.log(agent, 'agent from user stories asignment');
    return agent;
}

export function userStoriesToTasks( userStories: UserStory [], relationHoursPoints: number): Task[] {
    return userStories.map(function (element) {return userStoryToTask(element, relationHoursPoints)});
}

export function developersToAgents(
    developers: Developer[],
    workStartDate: Date,
    workEndDate: Date): Agent[] {
        return developers.map(
            function(developer) {
                return developerToAgent(developer, workStartDate, workEndDate);
            }
        );
    }

function getBusinessDatesCount(startDate: Date, endDate: Date) {
    let count = 0;
    const curDate: Date = new Date(startDate);
    const endDateD = new Date (endDate);
    while (curDate <= endDateD) {
        const dayOfWeek = curDate.getDay();
        if (!((dayOfWeek == 6) || (dayOfWeek == 0)))
           count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}
