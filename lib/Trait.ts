import { Bound, ConvertPxParentPercent } from "./Helpers"
import { Draggable } from "./Traits"


export enum Trait {
    Draggable = "Draggable"
}

export const ImplTrait = {
    "Draggable": Draggable.implement
}
