import { Task } from "./Task";
import { Agent } from "./Agent";
import { TaskGroup } from "./TaskGroup";

export class PulpAssignmentTaskGroups {
    tasks: Task[];
    agents: Agent[];
    assign_same_quantity_of_tasks: boolean;
    groups: TaskGroup[];
}