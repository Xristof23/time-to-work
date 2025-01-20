export default function Modal(props) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", "modal1");
  modal.innerHTML = /*html*/ `
    <p> ${props.text} </p>
    <button type="button" data-js="ok-button" >
    ${props.button1}
    </button>
    `;

  const okButton = modal.querySelector('[data-js="ok-button"]');
  okButton.addEventListener("click", handleAbort);

  function handleAbort(props) {
    // modal = document.getElementById("modal1");
    modal.remove();
    // modal.classList.toggle("modal--passive");
  }

  return modal;
}
