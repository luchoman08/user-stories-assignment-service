import { UserStoryGroup } from "./UserStoryGroup";
import { UserStory } from "./UserStory";
import { Developer } from "./Developer";

export class AssignmentByUserStoryGroups {

    developers: Developer[];
    userStories: UserStory[];
    assign_same_quantity_of_tasks: boolean;
    startDate: Date;
    endDate: Date;
    relationHoursPoints: number;
    user_stories_group: UserStoryGroup[];
}