import { AgentWithAttributes } from "./AgentWithAttributes";
import { TaskWithAtributesSerializer } from "./TaskWithAtributes";

export class PulpAssignmentWithAttributes  {
    tasks: TaskWithAtributesSerializer[];
    agents: AgentWithAttributes[];
    assign_same_quantity_of_tasks: boolean;
}