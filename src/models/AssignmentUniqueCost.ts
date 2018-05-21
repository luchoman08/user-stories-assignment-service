import { Developer } from "./";
import { UserStory } from "./";

import {
    validateDevelopersDisponibleHoursPerWeek,
    validateTotalPointsStories
 } from "./validations";

export class AssignmentUniqueCost {
    developers: Developer[];
    userStories: UserStory[];
    startDate: Date;
    endDate: Date;
    constructor () {}

    validate(): Boolean {
        return (validateDevelopersDisponibleHoursPerWeek(this.developers) &&
                validateTotalPointsStories(this.userStories));
        }
}