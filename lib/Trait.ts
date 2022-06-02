import { Bound, ConvertPxParentPercent } from "./Helpers"
import { Transform } from "./Traits"


export enum Trait {
    Draggable = "Draggable",
    Transform = "Transform"
}

export const ImplTrait = {
    "Transform": Transform.implement
}
