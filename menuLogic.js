function removeAndHideEverything() {
  const what = document.getElementById("what");
  const newTask = document.getElementById("form-container");
  const edit = document.getElementById("edit-container");
  const listContainer = document.getElementById("list-container");
  const analysis = document.getElementById("analysis");
  analysis && analysis.remove();
  listContainer && listContainer.remove();
  what && what.remove();
  edit && edit.remove();
  newTask.classList.add("form_container--noDisplay");
}

function deActivate() {
  const testElements = document.getElementsByClassName("menu_button--active");
  const testButtons = Array.prototype.filter.call(
    testElements,
    (testElement) => testElement.nodeName === "BUTTON"
  );
  const testButton = testButtons[0];
  testButton.classList.toggle("menu_button--active");
}

export { removeAndHideEverything, deActivate };
