import { Bound, GetComponentViewportOffset } from "../Helpers";
import { SceneComponent, TraitOptionType } from "../types";




export const Transform = {
    implement(component: SceneComponent) {

        let dragInfo = Draggable.implement(component)
        let scaleInfo = Scalable.implement(component)

        return {
            required: true,
            options: {
                size: {
                    x: {
                        type: TraitOptionType.Integer,
                        value: component.offsetWidth
                    },
                    y: {
                        type: TraitOptionType.Integer,
                        value: component.offsetHeight
                    }
                },
                position: {
                    x: {
                        type: TraitOptionType.Integer,
                        value: parseInt(GetComponentViewportOffset(component).left) - component.offsetWidth / 2,
                    },
                    y: {
                        type: TraitOptionType.Integer,
                        value: parseInt(GetComponentViewportOffset(component).top) - component.offsetHeight / 2
                    }
                },
                snap: {
                    type: TraitOptionType.Integer,
                    value: 20,
                    editable: true
                }
            },
            events: [].concat(dragInfo.events, scaleInfo.events || [])
        }
    }
}



const Draggable = {
    implement(component: SceneComponent) {
        function mouseMove(e: MouseEvent) {
            let viewport = document.getElementById("editor_viewport")
            let snap_px = component.trait_options.transform.snap.value || 20
            // jank fix but i really cba to figure out a proper one rn
            // legit prob just ignore it because i dont want to acknowledge it
            let rawX = e.pageX - ((component.offsetWidth / 2))
            let rawY = e.pageY - ((component.offsetHeight / 2))
            let snappedX = Math.floor(rawX / snap_px) * snap_px
            let snappedY = Math.floor(rawY / snap_px) * snap_px
            let boundedX = Bound(snappedX, 0, viewport.offsetWidth - component.offsetWidth)
            let boundedY = Bound(snappedY, 0, viewport.offsetHeight - component.offsetHeight)

            if (boundedX < viewport.offsetWidth / 2) {
                component.style.right = ""
                component.style.left = boundedX + "px"
            }
            else {
                component.style.left = ""
                component.style.right = viewport.offsetWidth - boundedX - component.offsetWidth + "px" 
            }

            if (boundedY < viewport.offsetHeight / 2) {
                component.style.bottom = ""
                component.style.top = boundedY + "px"
            }
            else {
                component.style.top = ""
                component.style.bottom = viewport.offsetHeight - boundedY - component.offsetHeight + "px"
            }

            component["trait_options"]["transform"]["position"]["x"]["value"] = boundedX
            component["trait_options"]["transform"]["position"]["y"]["value"] = boundedY

            document.dispatchEvent(new CustomEvent("component_trait_changed", {
                detail: {
                    component
                }
            }))
        }

        function mouseUp() {
            setCursor(false)
            document.removeEventListener("mousemove", mouseMove)
            document.removeEventListener("mouseup", mouseUp)
        }

        function enableDrag() {
            setCursor(true)
            document.addEventListener("mousemove", mouseMove)
            document.addEventListener("mouseup", mouseUp)
        }

        function setCursor(move: boolean) {
            component.style.cursor = move ? "move" : "auto"
        }


        return {
            events: [
                {
                    listener: "mousedown",
                    event: enableDrag
                }
            ]
        }
    }
}

const transformDisplay = document.createElement("div")
transformDisplay.style.position = "relative"
transformDisplay.style.width = "100%"
transformDisplay.style.height = "100%"
transformDisplay.style.zIndex = "2"
transformDisplay.innerHTML = `
<div class="transform-node top-left"></div>
<div class="transform-node top-mid"></div>
<div class="transform-node top-right"></div>
<div class="transform-node bottom-left"></div>
<div class="transform-node bottom-mid"></div>
<div class="transform-node bottom-right"></div>
<div class="transform-node left-mid"></div>
<div class="transform-node right-mid"></div>
`

const Scalable = {
    implement(component: SceneComponent) {

        let viewport = document.getElementById("editor_viewport")


        function scaleComponentY(scale: number, max = undefined) {
            let height = `calc(${component.style.height != "" ? component.style.height : "100px"} + ${(-scale)}px)`
            component.style.height = height
            let newHeight = Bound(component.offsetHeight, 30, max)
            component.style.height = newHeight + "px"
            component["trait_options"]["transform"]["size"]["y"]["value"] = component.offsetHeight

            document.dispatchEvent(new CustomEvent("component_trait_changed", {
                detail: {
                    component
                }
            }))
        }
        function scaleComponentX(scale: number, max = undefined) {
            let width = `calc(${component.style.width != "" ? component.style.width : "100px"} + ${(scale)}px)`
            component.style.width = width
            let newWidth = Bound(component.offsetWidth, 30, max)
            component.style.width = newWidth + "px"
            component["trait_options"]["transform"]["size"]["x"]["value"] = component.offsetWidth

            document.dispatchEvent(new CustomEvent("component_trait_changed", {
                detail: {
                    component
                }
            }))
        }

        function setListeners(scale) {
            document.addEventListener("mousemove", scale)
            let endScale = () => {
                document.removeEventListener("mousemove", scale)
                document.removeEventListener("mouseup", endScale)
            }
            document.addEventListener("mouseup", endScale)
        }

        function ScaleY(e: MouseEvent, neg = false) {
            adjustPositionOrigin(neg ? "top" : "bottom")
            e.stopPropagation()
            let offsets = GetComponentViewportOffset(component)
            let max = viewport.offsetHeight - (neg ? parseInt(offsets.top) : parseInt(offsets.bottom))
            let scale = (e: MouseEvent) => scaleComponentY(neg ? -e.movementY : e.movementY, max)
            setListeners(scale)
        }
        function ScaleX(e: MouseEvent, neg = false) {
            adjustPositionOrigin(neg ? "right" : "left")
            e.stopPropagation()
            let offsets = GetComponentViewportOffset(component)
            let max = viewport.offsetWidth - (neg ? parseInt(offsets.right) : parseInt(offsets.left))
            let scale = (e: MouseEvent) => scaleComponentX(neg ? -e.movementX : e.movementX, max)
            setListeners(scale)
        }

        function swapPositionOrigin(initial: string, swap: string) {
            if(!component.style[initial]) {
                component.style.setProperty(initial, "unset")
            }
            let offsets = GetComponentViewportOffset(component)
            console.log(initial, swap)
            console.log(offsets)
            component.style.setProperty(initial, "unset")
            component.style.setProperty(swap, offsets[swap] + "px")
        }

        function adjustPositionOrigin(dir) {
            switch(dir) {
                case "left":
                    swapPositionOrigin("right", "left")
                    break
                case "right":
                    swapPositionOrigin("left", "right")
                    break
                case "top":
                    swapPositionOrigin("bottom", "top")
                    break
                case "bottom":
                    swapPositionOrigin("top", "bottom")
                    break
            }
        }

        let td = component.appendChild(transformDisplay.cloneNode(true)) as HTMLDivElement
        td.style.display = "none"

        //---
        let topMid = component.querySelector(".top-mid") as HTMLDivElement
        topMid.addEventListener("mousedown", ScaleY)
        //---
        let rightMid = component.querySelector(".right-mid") as HTMLDivElement
        rightMid.addEventListener("mousedown", ScaleX)
        //---
        let leftMid = component.querySelector(".left-mid") as HTMLDivElement
        leftMid.addEventListener("mousedown", (e: MouseEvent) => ScaleX(e, true))
        //---
        let bottomMid = component.querySelector(".bottom-mid") as HTMLDivElement
        bottomMid.addEventListener("mousedown", (e: MouseEvent) => ScaleY(e, true))
        //---
        let topLeft = component.querySelector(".top-left") as HTMLDivElement
        topLeft.addEventListener("mousedown", (e: MouseEvent) => {
            ScaleX(e, true)
            ScaleY(e)
        })
        //---
        let topRight = component.querySelector(".top-right") as HTMLDivElement
        topRight.addEventListener("mousedown", (e: MouseEvent) => {
            ScaleX(e)
            ScaleY(e)
        })
        //---
        let bottomLeft = component.querySelector(".bottom-left") as HTMLDivElement
        bottomLeft.addEventListener("mousedown", (e: MouseEvent) => {
            ScaleX(e, true)
            ScaleY(e, true)
        })
        //---
        let bottomRight = component.querySelector(".bottom-right") as HTMLDivElement
        bottomRight.addEventListener("mousedown", (e: MouseEvent) => {
            ScaleX(e)
            ScaleY(e, true)
        })


        component.addEventListener("component_selected", () => {
            td.style.display = "block"
        })
        component.addEventListener("component_deselected", () => {
            td.style.display = "none"
        })

        return {
            events: [

            ]
        }
    }
}