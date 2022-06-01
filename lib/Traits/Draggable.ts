import { Bound } from "../Helpers";
import { SceneComponent, TraitOptionType } from "../types";

export const Draggable = {
    implement(component: SceneComponent): {options, events} {
        function mouseMove(e: MouseEvent) {
            let viewport = document.getElementById("editor_viewport")
            let snap_px = component.trait_options["draggable"].snap_px.value
            let rawX = e.pageX - component.offsetWidth / 2
            let rawY = e.pageY - component.offsetHeight / 2
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
        }

        function mouseUp() {
            console.log("Up")
            setCursor(false)
            document.removeEventListener("mousemove", mouseMove)
            document.removeEventListener("mouseup", mouseUp)
        }

        function enableDrag() {
            console.log("Drag enabled.")
            setCursor(true)
            document.addEventListener("mousemove", mouseMove)
            document.addEventListener("mouseup", mouseUp)
        }

        function setCursor(move: boolean) {
            component.style.cursor = move ? "move" : "auto"
        }


        return {
            options: {
                snap_px: {
                    type: TraitOptionType.Integer,
                    value: 10
                }
            },
            events: [
                {
                    listener: "mousedown",
                    event: enableDrag
                }
            ]
        }
    }
}