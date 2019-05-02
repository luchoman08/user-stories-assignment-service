import { Punctuation } from "./Punctuation";

export class Developer {
    id: string;
    full_name: string;
    role_name: string;
    available_hours_per_week: number;
    color: string;
    punctuations: Punctuation[];
    static defaultId = "11111111111111";
    static defaultFullName = 'Jhon Doe';
    constructor() {}
    public static getDummyDeveloper (): Developer {
        const developer = new Developer;
        developer.id = Developer.defaultId;
        developer.full_name = Developer.defaultFullName;
        developer.available_hours_per_week = 0;
        developer.role_name = 'Doe';
        developer.punctuations = new Array();
        return developer;
    }
}
