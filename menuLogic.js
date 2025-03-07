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
  !newTask.classList.contains("form_container--noDisplay") &&
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

function switchToAnalysis() {
  removeAndHideEverything();
  deActivate();
  const app = document.getElementById("app");
  const analysis = document.getElementById("analysis");
  const analysisButton = document.querySelector('[data-js="analysis-button"]');
  analysisButton.classList.add("menu_button--active");
  const myUserEntries = JSON.parse(localStorage.getItem("RecordedTasks")) || [];
  app.append(analysis(myUserEntries));
}

export { removeAndHideEverything, deActivate, switchToAnalysis };
