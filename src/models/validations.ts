import { UserStory } from "./UserStory";
import { Developer } from "./Developer";


export function validateDevelopersDisponibleHoursPerWeek(developers: Developer[]): Boolean {
    return developers.some((developer: Developer, index, array) => {
        return developer.available_hours_per_week === null;
    });
}

export function validateTotalPointsStories(userStories: UserStory[]): Boolean {
    return userStories.some((userStory: UserStory, index, array) => {
        return userStory.total_points === null;
    });
}