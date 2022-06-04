import { Bound, ConvertPxParentPercent } from "./Helpers"
import { Transform, Image } from "./Traits"


export enum Trait {
    Transform = "Transform",
    Image = "Image"
}

export const ImplTrait = {
    "Transform": Transform.implement,
    "Image": Image.implement
}
