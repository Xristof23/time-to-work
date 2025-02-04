import { dateOptions, timeOptions } from "../../utils.js";
import MainForm from "../MainForm/MainForm.js";
import Timing from "../Timing/Timing.js";

//"modul globals"

const today = new Date();

let localDate = today.toLocaleDateString("en-EN", dateOptions);

const formProps = { note: true };
//globaltest
window.timingProps = { started: false, testTime: 0 };

export default function FormContainer() {
  const formContainer = document.createElement("section");
  formContainer.setAttribute("id", "form-container");
  formContainer.classList.add("form_container");

  formContainer.innerHTML = /*html*/ `
    <h2> 
    New task (when shown?)
    </h2>
    <p>Date:  <output data-js="date-output">${localDate}</output>
    </p>
  `;
  formContainer.appendChild(MainForm(formProps));
  formContainer.appendChild(Timing());
  // needed here?
  const dateOutput = formContainer.querySelector('[data-js="date-output"]');

  return formContainer;
}
