export interface SceneComponent extends HTMLDivElement {
    trait_options?: {[key: string]: TraitData}
}

export abstract class ComponentTrait {
    abstract implement(component: SceneComponent)
}




export enum TraitOptionType {
    Integer,
    Float,
    String,
    Boolean
}

export interface TraitData {
    [key: string]: {
        type: TraitOptionType,
        value
    }
}