import { SceneComponent, TraitOptionType } from "../types";

export const Image = {
    implement(component: SceneComponent) {
        


        function enableTrait() {

        }
        function disableTrait() {

        }
        function removeTrait() {

        }
        function initTrait() {
            component.style.backgroundColor = "transparent"
            let img = component.appendChild(document.createElement("img"))
            img.classList.add("component_image")
            img.style.position = "absolute"
            img.style.left = "0"
            img.style.top = "0"
            img.style.width = "100%"
            img.style.height = "100%"
            img.src = ""
            img.style.userSelect = "none"
            img.style.zIndex = "1"
        }

        initTrait()

        return {
            options: {
                source: {
                    type: TraitOptionType.String,
                    value: "",
                    editable: true
                }
            },
            events: [
                {
                    listener: "component_trait_changed",
                    event: (e) => {
                        if(e.detail.key != "source") return
                        let img = component.querySelector(".component_image") as HTMLImageElement
                        img.src = e.detail.value
                    }
                }
            ]
        }
    }
}