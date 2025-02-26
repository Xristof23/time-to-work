import { dateOptions } from "../../utils.js";
import MainForm from "../MainForm/MainForm.js";
import Timing from "../Timing/Timing.js";

const today = new Date();

let localDate = today.toLocaleDateString("en-EN", dateOptions);

const formProps = { note: true };

//globalvars
window.timingProps = {
  started: false,
  haltTimer: false,
  startValue: 0,
  timespan: 0,
};

export default function FormContainer() {
  const formContainer = document.createElement("section");
  formContainer.setAttribute("id", "form-container");
  formContainer.classList.add("form_container");

  formContainer.innerHTML = /*html*/ `
    <h2> 
    New task
    </h2>
    <p>Date:  <output data-js="date-output">${localDate}</output>
    </p>
  `;
  formContainer.appendChild(MainForm(formProps));
  formContainer.appendChild(Timing());

  return formContainer;
}
