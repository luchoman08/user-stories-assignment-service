import {
    PulpAssignmentUniqueCost,
    PulpAssignmentWithAttributes,
    PulpAssignmentWithPairs,
    PulpAssignmentWithPairsResponse,
    PulpAssignmentUniqueCostResponse,
    PulpAssignmentWithAttributesResponse,
    Task,
    TaskWithAtributes,
    Agent,
    AgentWithAttributes,
    PulpAssignmentTaskGroupsResponse
} from "./models";

import {
    AssignmentUniqueCost,
    AssignmentByPunctuation,
    AssignmentWithPairs,
    Developer,
    DeveloperPair,
    UserStory,
    UserStoryGroup
} from "../models";
import { Punctuation } from "../models/Punctuation";
import { AtributePunctuation } from "./models/AtributePunctuation";
import { TaskGroup } from "./models/TaskGroup";
import { AssignmentByUserStoryGroups } from "../models/AssignmentByUserStoryGroups";
import { PulpAssignmentTaskGroups } from "./models/PulpAssignmentTaskGroups";


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

export function userStoryGroupToTaskGroup(userStoryGroup: UserStoryGroup): TaskGroup {
    const taskGroup = new TaskGroup();
    const user_Story_ids = userStoryGroup.user_stories.map(user_story => user_story.id);
    taskGroup.external_id = userStoryGroup.id;
    taskGroup.task_ids = user_Story_ids;
    return taskGroup;
}
export function userStoryGroupsToTaskGroups(userStoryGroups: UserStoryGroup[]): TaskGroup[] {
    return userStoryGroups.map(userStoryGroupToTaskGroup);
}

export function pulpAssignmentTaskGroupResponseToAssignmentByUserStoryGroups(
    pulpAssignmentTaskGroupResponse: PulpAssignmentTaskGroupsResponse,
    assignmentByUserStoryGroups: AssignmentByUserStoryGroups
): AssignmentByUserStoryGroups {
    for (const id_agent in pulpAssignmentTaskGroupResponse.assignments) {
        for (const idUserStory of pulpAssignmentTaskGroupResponse.assignments[id_agent]) {
            assignmentByUserStoryGroups.userStories.find(
                userStory => Number(userStory.id) === Number(idUserStory)).assigned_to = id_agent;
        }
    }
    return assignmentByUserStoryGroups;
}
export function pulpAssignmentWithPairsResponseToassignmentWithPairs(
    pulpAssignmentWithPairsResponse: PulpAssignmentWithPairsResponse,
    assignmentWithPairs: AssignmentWithPairs
): AssignmentWithPairs {
    console.log('pulpAssignmentWithPairsResponse', pulpAssignmentWithPairsResponse)
    for (const idPair in pulpAssignmentWithPairsResponse.assignments) {
        for( const idUserStory of pulpAssignmentWithPairsResponse.assignments[idPair]) {
            assignmentWithPairs.userStories.find(
                userStory => {
                    return Number(userStory.id) === Number(idUserStory);
                }
            ).assigned_to = pulpAssignmentWithPairsResponse.pairs[idPair];
        }
    }
    assignmentWithPairs.reverse = assignmentWithPairs.reverse;
    assignmentWithPairs.pairs = pulpAgentPairsToDeveloperPairs(pulpAssignmentWithPairsResponse.pairs, assignmentWithPairs.developers);
    return assignmentWithPairs;
}
/**
 * Convertion of a pulp agent pair to developer pair
 * @param pulpAgentPair A pulp developer pair is an array of size 2 with the agents id
 */ 
export function pulpAgentPairToDeveloperPair(
    pulpAgentPair: Array<string>,
    developers: Developer[]
): DeveloperPair {
    let developerPair = new DeveloperPair();
    developerPair.developer1 = developers.find(developer => String(developer.id) === String(pulpAgentPair[0])) || null;
    developerPair.developer2 = developers.find(developer => String(developer.id) === String(pulpAgentPair[1])) || null;
    developerPair.calculate_compatibility();
    return developerPair;
}

export function pulpAgentPairsToDeveloperPairs (
    pulpAgentPairs: {[id_pair: string]: string[]},
    developers: Developer[]
): DeveloperPair[] {
    let pulpAgentPairIDs = Object.keys(pulpAgentPairs);
    let pulpAgentPairValues = pulpAgentPairIDs.map( id => pulpAgentPairs[id]);
    console.log(developers);
    return pulpAgentPairValues.map(function(pulpAgentPair){
        return pulpAgentPairToDeveloperPair(pulpAgentPair, developers);
    });
}

export function assignmentWithPairstoPulpAssignmentWithPairs(
    assignmentWithPairs: AssignmentWithPairs
): PulpAssignmentWithPairs {
    const pulpAssignmentWithPairs = new PulpAssignmentWithPairs();
    pulpAssignmentWithPairs.agents = developersToAgentsWithAttributes(assignmentWithPairs.developers);
    pulpAssignmentWithPairs.tasks = userStoriesToTaskWithAttributes(assignmentWithPairs.userStories);
    pulpAssignmentWithPairs.reverse = assignmentWithPairs.reverse;
    return pulpAssignmentWithPairs;
}



export function assignmentByUserStoryGroupsToPulpAssignmentTaskGroup(
    assignmentByUserStoryGroups: AssignmentByUserStoryGroups
): PulpAssignmentTaskGroups {
    const pulpAssignmentTaskGroup = new PulpAssignmentTaskGroups ();
    pulpAssignmentTaskGroup.agents = developersToAgents(assignmentByUserStoryGroups.developers, assignmentByUserStoryGroups.startDate, assignmentByUserStoryGroups.endDate);
    pulpAssignmentTaskGroup.tasks = userStoriesToTasks(assignmentByUserStoryGroups.userStories, assignmentByUserStoryGroups.relationHoursPoints);
    pulpAssignmentTaskGroup.assign_same_quantity_of_tasks = assignmentByUserStoryGroups.assign_same_quantity_of_tasks;
    pulpAssignmentTaskGroup.groups = userStoryGroupsToTaskGroups(assignmentByUserStoryGroups.user_stories_group);
    return pulpAssignmentTaskGroup;
}


export function taskGroupToUserStoryGroup(taskGroup: TaskGroup, userStories: UserStory[]): UserStoryGroup {
    const userStoryGroup = new UserStoryGroup();
    const user_stories_in_group = new Array<UserStory>();
    userStoryGroup.id = taskGroup.external_id;
    for(const task_id in taskGroup.task_ids) {
        let userStory = userStories.find(userStory=> userStory.id === task_id);
        user_stories_in_group.push(userStory);
    }
    userStoryGroup.user_stories = user_stories_in_group; 
    return userStoryGroup;
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
    console.log("developer.available_hours_per_week", workStartDate, workEndDate);
    agent.capacity = developer.available_hours_per_week / 5 * getBusinessDatesCount(workStartDate, workEndDate);
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
