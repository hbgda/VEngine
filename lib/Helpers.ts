import type { SceneComponent } from "./types"

export let Bound = (num: number, min: number, max: number): number => num < min ? min : num > max ? max : num
export let ConvertPxParentPercent = (px: number, parentBound): string => (px / parentBound * 100).toString() + "%"
export let OffsetIsSet = (component: HTMLElement, dir: string) => {
    //console.log(component.style)
    //return window.getComputedStyle(component)[dir] != "0" && window.getComputedStyle(component)[dir] != "0px" && window.getComputedStyle(component)[dir] != ""
    return component.style[dir] != "0" && component.style[dir] != "unset" && component.style[dir] != ""
}
export let GetComponentViewportOffset = (component: SceneComponent) => {
    const viewport = document.getElementById("editor_viewport")
    


    let top    = OffsetIsSet(component, "top")    ? component.style.top    : (OffsetIsSet(component, "bottom") ? viewport.offsetHeight - parseInt(component.style.bottom.replace("px", "")) - component.offsetHeight : viewport.offsetHeight - component.offsetHeight).toString()
    let bottom = OffsetIsSet(component, "bottom") ? component.style.bottom : (OffsetIsSet(component, "top")    ? viewport.offsetHeight - parseInt(component.style.top.replace("px", ""))    - component.offsetHeight : viewport.offsetHeight - component.offsetHeight).toString()
    let left   = OffsetIsSet(component, "left")   ? component.style.left   : (OffsetIsSet(component, "right")  ? viewport.offsetWidth  - parseInt(component.style.right.replace("px", ""))  - component.offsetWidth  : viewport.offsetWidth - component.offsetWidth).toString()
    let right  = OffsetIsSet(component, "right")  ? component.style.right  : (OffsetIsSet(component, "left")   ? viewport.offsetWidth  - parseInt(component.style.left.replace("px", ""))   - component.offsetWidth  : viewport.offsetWidth - component.offsetWidth).toString()
    return {
        top: top.replace("px", ""), 
        left: left.replace("px", ""),
        right: right.replace("px", ""), 
        bottom: bottom.replace("px", "")
    }
}
export let GetStyle = (component: HTMLElement) => window.getComputedStyle(component)
