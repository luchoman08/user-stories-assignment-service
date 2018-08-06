import { Punctuation } from "./Punctuation";

export class Developer {
    id: string;
    full_name: string;
    role_name: string;
    available_hours_per_week: number;
    color: string;
    punctuations: Punctuation[];
    constructor() {}
}
