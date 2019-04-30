import { AgentWithAttributes } from "./AgentWithAttributes";
import { TaskWithAtributes } from "./TaskWithAtributes";

export class PulpPairGenerationInput  {
    agents: AgentWithAttributes[];
    reverse: boolean;
}