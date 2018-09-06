import {
    PulpAssignmentUniqueCost,
    PulpAssignmentWithAttributes,
    PulpAssignmentUniqueCostResponse,
    PulpAssignmentWithAttributesResponse,
    Task,
    TaskWithAtributes,
    Agent,
    AgentWithAttributes
} from "./models";

import {
    AssignmentUniqueCost,
    AssignmentByPunctuation,
    Developer,
    UserStory
} from "../models";
import { Punctuation } from "../models/Punctuation";
import { AtributePunctuation } from "./models/AtributePunctuation";


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
export function assignmentWithAttributesToPulpAssignmentWithAttributes
    (assignmentByPunctuation: AssignmentByPunctuation): PulpAssignmentWithAttributes {
    const pulpAssignmentWithAttributes: PulpAssignmentWithAttributes = new PulpAssignmentWithAttributes();
    pulpAssignmentWithAttributes.agents = developersToAgentsWithAttributes(assignmentByPunctuation.developers);
    pulpAssignmentWithAttributes.tasks = userStoriesToTaskWithAttributes(assignmentByPunctuation.userStories);
    pulpAssignmentWithAttributes.assign_same_quantity_of_tasks = assignmentByPunctuation.assign_same_quantity_of_tasks;
    return pulpAssignmentWithAttributes; 
}
export function pulpAssignmentUniqueCostResponseToassignementUniqueCost(
    pulpAssignmentUniqueCostResponse: PulpAssignmentUniqueCostResponse,
    assignmentUniqueCost: AssignmentUniqueCost
): AssignmentUniqueCost {
    for (const id_agent in pulpAssignmentUniqueCostResponse.assignments) {
        for (const idUserStory of pulpAssignmentUniqueCostResponse.assignments[id_agent]) {
            assignmentUniqueCost.userStories.find(userStory => Number(userStory.id) === Number(idUserStory)).assigned_to = id_agent;
        }
    }
    return assignmentUniqueCost;
}

export function userStoryToTask(userStory: UserStory, relationHoursPoints: number): Task {
    const task = new Task();
    task.external_id = userStory.id;
    task.cost = userStory.total_points * relationHoursPoints;
    return task;
}
export function pulpAssignmentWithAttributesResponseToassignementByPunctuations(
    pulpAssignmentWithAttributesResponse: PulpAssignmentWithAttributesResponse,
    assignmentByPunctuations: AssignmentByPunctuation
): AssignmentByPunctuation {
    for (const id_agent in pulpAssignmentWithAttributesResponse.assignments) {
        for (const idUserStory of pulpAssignmentWithAttributesResponse.assignments[id_agent]) {
            assignmentByPunctuations.userStories.find(userStory => Number(userStory.id) === Number(idUserStory)).assigned_to = id_agent;
        }
    }
    return assignmentByPunctuations;
}
export function userStoryToTaskWithAttributes(userStory: UserStory): TaskWithAtributes {
    const taskWithAttributes = new TaskWithAtributes();
    taskWithAttributes.external_id = userStory.id;
    taskWithAttributes.attributes_punctuation = punctuationsToPulpPunctuations(userStory.punctuations);
    return taskWithAttributes;
}
export function userStoriesToTaskWithAttributes(userStories: UserStory[]): TaskWithAtributes[] {
    return userStories.map(userStoryToTaskWithAttributes);
}
function punctuationToTaskPunctuation(punctuation: Punctuation): AtributePunctuation {
    const attributePunctuation = new AtributePunctuation();
    attributePunctuation.external_id = punctuation.id;
    attributePunctuation.punctuation = punctuation.value? punctuation.value: 0;
    return attributePunctuation;
}
function punctuationsToPulpPunctuations(punctuations: Punctuation[]): AtributePunctuation[] {
    return punctuations.map(punctuationToTaskPunctuation);
}


export function userStoriesToTasks(userStories: UserStory[], relationHoursPoints: number): Task[] {
    return userStories.map(function (element) { return userStoryToTask(element, relationHoursPoints) });
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
export function developersToAgents(
    developers: Developer[],
    workStartDate: Date,
    workEndDate: Date): Agent[] {
    return developers.map(
        function (developer) {
            return developerToAgent(developer, workStartDate, workEndDate);
        }
    );
}
/*
	The 
*/
export function developerToAgentWithAttributes(developer: Developer): AgentWithAttributes {
    let agentWithAttributes = new AgentWithAttributes();
    agentWithAttributes.external_id = developer.id;
    agentWithAttributes.attributes_punctuation = punctuationsToPulpPunctuations(developer.punctuations);
    return agentWithAttributes;
}
export function developersToAgentsWithAttributes(developers: Developer[]): AgentWithAttributes[] {
    return developers.map(developerToAgentWithAttributes);
}
function getBusinessDatesCount(startDate: Date, endDate: Date) {
    let count = 0;
    const curDate: Date = new Date(startDate);
    const endDateD = new Date(endDate);
    while (curDate <= endDateD) {
        const dayOfWeek = curDate.getDay();
        if (!((dayOfWeek == 6) || (dayOfWeek == 0)))
            count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}
