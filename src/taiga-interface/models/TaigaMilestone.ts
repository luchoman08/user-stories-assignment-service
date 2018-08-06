import { TaigaUserStory } from ".";
export class TaigaMilestone {
    id: string;
    name: string;
    estimated_start: string; //  iso date (YYYY-MM-DD)
    estimated_finish: string; // iso date (YYYY-MM-DD)
    slug: string;
    user_stories: TaigaUserStory[];
    constructor () {}
}
