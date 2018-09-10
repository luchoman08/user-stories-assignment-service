import { Punctuation } from "./Punctuation";

export class UserStory {
    id: string;
    total_points: number;
    subject: string;
    assigned_to: string | string[]; // Developer than is assigned to
    punctuations: Punctuation[];
    constructor() {}
}