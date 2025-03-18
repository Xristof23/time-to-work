import { switchToDone } from "../../menuLogic.js";
import { modalContentList } from "../../modalContent.js";

export default function Modal(keyWord, id, entryToEdit) {
  const props = modalContentList.filter((el) => el.mode === keyWord);
  const {
    text,
    button1,
    button2,
    button3,
    firstFunction,
    secondFunction,
    thirdFunction,
    style1,
    style2,
    style3,
    mode,
  } = props[0];

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", "modal1");
  const idText = id && mode === "delete" ? `${id}!` : "";

  modal.innerHTML = /*html*/ `
    <p> ${text} ${idText}</p>
    <button type="button" class="modal_button--green" data-js="modal-button-1" >
    ${button1}
    </button>
    <button type="button" class="yes_button" data-js="modal-button-2">
    ${button2}
    </button> 
       <button type="button" class="yes_button" data-js="third-button">
    ${button3}
    </button> 
    `;

  const modalButton1 = modal.querySelector('[data-js="modal-button-1"]');
  modalButton1.addEventListener("click", handleFirst);
  const modalButton2 = modal.querySelector('[data-js="modal-button-2"]');
  modalButton2.addEventListener("click", handleSecond);

  const thirdButton = modal.querySelector('[data-js="third-button"');
  thirdButton.addEventListener("click", handleThird);

  !button2 && modalButton2.classList.add("button--passive");
  !button3 && thirdButton.classList.add("button--passive");

  function getStyled() {
    const class2 = style2 || style1;
    const class3 = style3 || style2 || style1;
    modalButton1.classList.add(style1);
    modalButton2.classList.add(class2);
    thirdButton.classList.add(class3);
  }

  getStyled();

  function handleFirst() {
    firstFunction && firstFunction();
    modal.remove();
  }

  function handleSecond() {
    secondFunction && secondFunction(id);
    modal.remove();
  }

  function handleThird() {
    thirdFunction ? thirdFunction() : switchToDone();
    modal.remove();
  }

  return modal;
}
