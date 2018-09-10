import { Developer } from ".";
import { UserStory } from ".";

import {
    validateDevelopersDisponibleHoursPerWeek,
    validateTotalPointsStories
 } from "./validations";

export class AssignmentUniqueCost {
    developers: Developer[];
    userStories: UserStory[];
    startDate: Date;
    endDate: Date;
    relationHoursPoints: number;
    assign_same_quantity_of_tasks: boolean;
    constructor () {}

    validate(): Boolean {
        return (validateDevelopersDisponibleHoursPerWeek(this.developers) &&
                validateTotalPointsStories(this.userStories));
        }
}
