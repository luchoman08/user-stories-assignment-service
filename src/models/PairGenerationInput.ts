import { Developer } from "./Developer";
import { UserStory } from "./UserStory";
import { DeveloperPair } from "./DeveloperPair";

export class PairGenerationInput  {
    developers: Developer[];
    reverse: boolean;
}