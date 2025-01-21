import { Stack } from "./stack.js";

document.addEventListener("DOMContentLoaded", function () {
  const textbox = document.getElementById("comment");
  const undo = document.getElementById("undo");
  const clear = document.getElementById("clear");
  const temptext = document.getElementById("temptext");

  let text = "";
  let stack = new Stack();

  // Ensure cursor starts at the end of text on click
  textbox.onclick = function () {
    textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
  };

  // Clear button functionality
  clear.onclick = function () {
    stack.clear();
    text = "";
    textbox.value = "";
    temptext.innerHTML = "Output";
  };

  // Update stack on text input
  textbox.oninput = function (event) {
    if (event.inputType === "insertText" && event.data) {
      stack.push(0, event.data);
    } else if (event.inputType === "deleteContentBackward" && text.length > 0) {
      stack.push(1, text[text.length - 1]);
    }
    temptext.innerHTML = `On stack: ${JSON.stringify(stack.top())}<br>${
      temptext.innerHTML
    }`;
    text = textbox.value;
  };

  // Undo button functionality
  undo.onclick = function () {
    let operation = stack.pop();
    if (operation[0] !== -1) {
      temptext.innerHTML = `Undo operation in progress..<br>${temptext.innerHTML}`;
      if (operation[0] === 0) {
        // Undo inserted text
        textbox.value = textbox.value.slice(0, -operation[1].length);
      } else if (operation[0] === 1) {
        // Undo deleted text
        textbox.value += operation[1];
      }
      text = textbox.value;
    } else {
      temptext.innerHTML = `No operations to undo.<br>${temptext.innerHTML}`;
    }
  };
});
