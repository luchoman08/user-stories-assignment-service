import { SprintInterface } from '../generics/sprint.interface';
import { SimpleUserStory } from './';

export class SimpleSprint implements SprintInterface {
    id: string;
    name: string;
    estimated_start: string; //  iso date (YYYY-MM-DD)
    estimated_finish: string; // iso date (YYYY-MM-DD)
    user_stories: SimpleUserStory[];
}
