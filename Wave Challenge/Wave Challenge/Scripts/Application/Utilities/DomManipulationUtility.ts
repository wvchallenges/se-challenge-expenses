namespace Utilities.DomManipulationUtility {
    export let ClearFileInput = (id) => {
        let oldInput = <HTMLInputElement>document.getElementById(id);

        let newInput = <HTMLInputElement>document.createElement("input");

        newInput.type = "file";
        newInput.id = oldInput.id;
        newInput.name = oldInput.name;
        newInput.accept = oldInput.accept;
        newInput.className = oldInput.className;
        newInput.style.cssText = oldInput.style.cssText;
        // TODO: copy any other relevant attributes 

        oldInput.parentNode.replaceChild(newInput, oldInput);
    }
}