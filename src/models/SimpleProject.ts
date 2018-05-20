import { ProjectInterface } from '../generics';
import { SimpleDeveloper, SimpleUserStory, SimpleSprint} from './';
export class SimpleProject implements ProjectInterface {
    id: string;
    created_date: string; // long format
    description: string;
    simpleSprints: SimpleSprint[];
    simpleDevelopers: SimpleDeveloper[];
    simpleUserStories: SimpleUserStory[];
    name: string;
}
