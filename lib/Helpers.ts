import type { SceneComponent } from "./types"

export let Bound = (num: number, min: number, max: number): number => num < min ? min : num > max ? max : num
export let ConvertPxParentPercent = (px: number, parentBound): string => (px / parentBound * 100).toString() + "%"
export let OffsetIsSet = (component: SceneComponent, dir: string) => {
    return component.style[dir] != "0" && component.style[dir] != "0px" && component.style[dir] != "unset" && component.style[dir] != ""
}
export let GetComponentViewportOffset = (component: SceneComponent) => {
    const viewport = document.getElementById("editor_viewport")
    
    let top    = OffsetIsSet(component, "top")    ? component.style.top    : (OffsetIsSet(component, "bottom") ? viewport.offsetHeight - parseInt(component.style.bottom.replace("px", "")) - component.offsetHeight : "0") + "px"
    let bottom = OffsetIsSet(component, "bottom") ? component.style.bottom : (OffsetIsSet(component, "top")    ? viewport.offsetHeight - parseInt(component.style.top.replace("px", ""))    - component.offsetHeight : "0") + "px"
    let left   = OffsetIsSet(component, "left")   ? component.style.left   : (OffsetIsSet(component, "right")  ? viewport.offsetWidth  - parseInt(component.style.right.replace("px", ""))  - component.offsetWidth  : "0") + "px"
    let right  = OffsetIsSet(component, "right")  ? component.style.right  : (OffsetIsSet(component, "left")   ? viewport.offsetWidth  - parseInt(component.style.left.replace("px", ""))   - component.offsetWidth  : "0") + "px"
    return {
        top, left, right, bottom
    }
}