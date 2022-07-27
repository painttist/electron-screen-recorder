/**
 * @module preload
 */

import { ipcRenderer } from "electron";

export { sha256sum } from "./nodeCrypto";
export { versions } from "./versions";

const ignoreMouse = () => {
  ipcRenderer.send("set-ignore-mouse-events", true, { forward: true });
};

const useMouse = () => {
  ipcRenderer.send("set-ignore-mouse-events", false);
};

window.addEventListener("DOMContentLoaded", () => {
  // Working but might be a little inefficient
  // window.addEventListener("mousemove", function (event) {
  //   let el = event.target as HTMLElement;
  //   // console.log("Mouse Move", el);
  //   if (
  //     el?.classList.contains("mouse") ||
  //     el?.classList.contains("window-handle")
  //   ) {
  //     useMouse();
  //   } else {
  //     ignoreMouse();
  //   }
  // });

  let el = document.getElementById("windowElement");
  el?.addEventListener("mouseenter", (event) => {
    console.log("mouseenter");
    useMouse();
  });

  el?.addEventListener("mouseleave", (event) => {
    console.log("mouseleave");
    ignoreMouse();
  });

  if (el) dragElement(el);
});

function dragElement(elmnt: HTMLElement) {
  console.log("Set up drag", elmnt);
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
