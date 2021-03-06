import { AgentWithAttributes } from "./AgentWithAttributes";
import { TaskWithAtributes } from "./TaskWithAtributes";

export class PulpAssignmentWithAttributes  {
    tasks: TaskWithAtributes[];
    agents: AgentWithAttributes[];
    assign_same_quantity_of_tasks: boolean;
}