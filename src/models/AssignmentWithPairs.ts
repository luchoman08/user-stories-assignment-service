import { Developer } from "./Developer";
import { UserStory } from "./UserStory";
import { DeveloperPair } from "./DeveloperPair";

export class AssignmentWithPairs  {
    developers: Developer[];
    pairs?: DeveloperPair[];
    userStories: UserStory[];
    reverse: boolean;
}