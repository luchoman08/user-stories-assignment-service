import { TaigaMilestone } from "./";
import { TaigaMembership } from "./";
export class TaigaProject {
    id: string;
    members: TaigaMembership[];
    name: string;
    description: string;
    slug: string;
    milestones: any[];
    created_date: string; // ej.  "2018-05-04T15:50:11.858Z"
    constructor () {}
  }
