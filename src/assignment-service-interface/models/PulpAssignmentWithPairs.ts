import { AgentWithAttributes } from "./AgentWithAttributes";
import { TaskWithAtributes } from "./TaskWithAtributes";

export class PulpAssignmentWithPairs  {
    tasks: TaskWithAtributes[];
    agents: AgentWithAttributes[];
    reverse: boolean;
}