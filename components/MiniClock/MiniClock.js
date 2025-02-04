export default function MiniClock(props) {
  const miniClock = document.createElement("section");
  miniClock.classList.add("miniClock");
  miniClock.setAttribute("id", "miniClock");
  miniClock.innerHTML = /* html */ `
    <div class="big-hand-mover" data-js="big-hand-mover">
         <div class="big-hand" data-js="big-hand"></div>
    </div>
 
    <div class="mini-short-hand-mover" data-js="short-hand-mover">
         <div class="mini-short-hand"></div>
    </div>
       <div class="second-hand-mover" data-js="second-hand-mover">
         <div class="second-hand"></div>
    </div>
    
    <div class="center-point"></div>
    <div class="number-12">12</div>
    <div class="number-9">9</div>
    <div class="number-6">6</div>
    <div class="number-3">3</div>
    <div class="marker1"></div>
    <div class="marker2"></div>
    <div class="marker3"></div>
    <div class="marker4"></div>
    <div class="marker5"></div>
    <div class="marker6"></div>
    <div class="marker7"></div>
    <div class="marker8"></div>
    <div class="marker9"></div>
    <div class="marker10"></div>
    <div class="marker11"></div>
    <div class="marker12"></div>
   
    <div class="mini-button-wrapper">
    <button class="mini-button--noDisplay" data-js="big-hand-button">set</button>
    <button  class="mini-button" data-js="second-button">start</button>
    <button  class="mini-button" data-js="third-button">stop</button>
     <button  class="mini-button--noDisplay" data-js="fourth-button">1 sec</button>
     <p class="mini-button--noDisplay" id="123">${props.start}</p>
    </div>
    `;

  const bigHandButton = miniClock.querySelector('[data-js="big-hand-button"]');
  bigHandButton.addEventListener("click", setClock);
  const secondButton = miniClock.querySelector('[data-js="second-button"]');
  secondButton.addEventListener("click", updateClock);
  const thirdButton = miniClock.querySelector('[data-js="third-button"]');
  thirdButton.addEventListener("click", stopClock);
  const fourthButton = miniClock.querySelector('[data-js="fourth-button"]');
  fourthButton.addEventListener("click", () => handleSecondHand(1));

  let startSeconds = Math.round(Date.now() / 1000);

  let bigHandRotation = 0;
  let shortHandRotation = 0;
  let secondHandRotation = 0;
  let intervalId;
  let clockIsSet = false;

  function updateClock() {
    if (!intervalId) {
      intervalId = setInterval(moveClock, 1000);
    }
  }

  !clockIsSet && setClock();
  clockIsSet && updateClock();

  function stopClock() {
    clearInterval(intervalId);
    intervalId = null;
  }

  function moveClock() {
    const currentSeconds = Math.round(Date.now() / 1000);
    const moveSeconds = currentSeconds - startSeconds;
    const moveMinutes = moveSeconds / 60;
    handleSecondHand(moveSeconds);
    moveBothHands(moveMinutes);
    startSeconds = currentSeconds;
  }

  function setClock() {
    const date = new Date();
    const setHours = date.getHours() % 12;
    const setMinutes = setHours * 60 + date.getMinutes();
    const setSeconds = date.getSeconds();
    moveBothHands(setMinutes);
    handleSecondHand(setSeconds);
    clockIsSet = true;
  }

  function moveBothHands(timespan, options) {
    //timespan in minutes
    handleBigHand(timespan * 6);
    handleShortHand(timespan / 2);
  }
  function handleSecondHand(seconds) {
    const secondHandMover = miniClock.querySelector(
      '[data-js="second-hand-mover"]'
    );
    secondHandRotation = secondHandRotation + seconds * 6;
    secondHandMover.style.transform = `rotate(${secondHandRotation}deg)`;
  }

  function handleBigHand(degrees) {
    const bigHandMover = miniClock.querySelector('[data-js="big-hand-mover"]');
    bigHandRotation = bigHandRotation + degrees;
    bigHandMover.style.transform = `rotate(${bigHandRotation}deg)`;
  }
  function handleShortHand(degrees) {
    const shortHandMover = miniClock.querySelector(
      '[data-js="short-hand-mover"]'
    );
    shortHandRotation = shortHandRotation + degrees;
    shortHandMover.style.transform = `rotate(${shortHandRotation}deg)`;
  }

  return miniClock;
}
