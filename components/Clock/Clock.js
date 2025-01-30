export default function Clock() {
  const clock = document.createElement("section");
  clock.classList.add("clock");
  clock.setAttribute("id", "clock");
  clock.innerHTML = /* html */ `
    <div class="big-hand-mover" data-js="big-hand-mover">
         <div class="big-hand" data-js="big-hand"></div>
    </div>
 
    <div class="short-hand-mover" data-js="short-hand-mover">
         <div class="short-hand"></div>
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
   
    <div class="button-wrapper">
    <button class="big-hand_button" data-js="big-hand-button">set</button>
    <button data-js="second-button">start</button>
    <button data-js="third-button">stop</button>
    </div>
    `;

  const bigHandButton = clock.querySelector('[data-js="big-hand-button"]');
  bigHandButton.addEventListener("click", setClock);
  const secondButton = clock.querySelector('[data-js="second-button"]');
  secondButton.addEventListener("click", updateClock);
  const thirdButton = clock.querySelector('[data-js="third-button"]');
  thirdButton.addEventListener("click", stopClock);

  let startSeconds = Math.round(Date.now() / 1000);

  let bigHandRotation = 0;
  let shortHandRotation = 0;
  let intervalId;
  let clockIsSet = false;

  function updateClock() {
    if (!intervalId) {
      intervalId = setInterval(moveClock, 2000);
    }
  }

  !clockIsSet && setClock();

  function stopClock() {
    clearInterval(intervalId);
    intervalId = null;
    console.log("clock stopped");
  }

  function moveClock() {
    const currentSeconds = Math.round(Date.now() / 1000);
    const moveSeconds = currentSeconds - startSeconds;
    const moveMinutes = moveSeconds / 60;
    moveBothHands(moveMinutes);
    startSeconds = currentSeconds;
  }

  function setClock() {
    const date = new Date();
    const setHours = date.getHours() % 12;
    const setMinutes = setHours * 60 + date.getMinutes();
    moveBothHands(setMinutes);
    clockIsSet = true;
  }

  function moveBothHands(timespan, options) {
    //timespan in minutes for now
    handleBigHand(timespan * 6);
    handleShortHand(timespan / 2);
  }

  function handleBigHand(degrees) {
    const bigHandMover = clock.querySelector('[data-js="big-hand-mover"]');
    bigHandRotation = bigHandRotation + degrees;
    bigHandMover.style.transform = `rotate(${bigHandRotation}deg)`;
  }
  function handleShortHand(degrees) {
    const shortHandMover = clock.querySelector('[data-js="short-hand-mover"]');
    shortHandRotation = shortHandRotation + degrees;
    shortHandMover.style.transform = `rotate(${shortHandRotation}deg)`;
  }

  return clock;
}
