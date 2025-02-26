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
     <div class="sector_1" data-js="sector-1">
    </div>
    
    <div class="center_point"></div>
     <div class="circle_cover"></div>
     <div class="number_1">1</div>
     <div class="number_2">2</div>
     <div class="number_3">3</div>
     <div class="number_4">4</div>
     <div class="number_5">5</div>
       <div class="number_6">6</div>
         <div class="number_7">7</div>
           <div class="number_8">8</div>
             <div class="number_9">9</div>
  
    <div class="number_10">10</div>
    <div class="number_11">11</div>
      <div class="number_12">12</div>
    
    
    
    <div class="marker_1_7"></div>
    <div class="marker_2_8"></div>
    <div class="marker_3_9"></div>
    <div class="marker_4_10"></div>
    <div class="marker_5_11"></div>
    <div class="marker_6_12"></div>
 
    <div class="mini-button-wrapper">
    <button class="mini-button--noDisplay" data-js="first-button">first</button>
    <button  class="mini-button--noDisplay" data-js="second-button">stop</button>
    </div>
    `;

  const bigHandButton = miniClock.querySelector('[data-js="first-button"]');
  bigHandButton.addEventListener("click", firstFunction);
  const secondButton = miniClock.querySelector('[data-js="second-button"]');
  secondButton.addEventListener("click", stopClock);

  //for further development
  function firstFunction() {
    handleSecondHand(5);
  }

  let startSeconds = Math.round(Date.now() / 1000);

  let bigHandRotation = 0;
  let shortHandRotation = 0;
  let secondHandRotation = 0;
  let intervalId;
  let intervalId2;
  let clockIsSet = false;

  let sectorUpdating = false;

  function updateClock() {
    if (!intervalId) {
      intervalId = setInterval(moveClock, 1000);
    }
  }

  function updateSector() {
    if (!intervalId2) {
      intervalId2 = setInterval(transformSector, 1000);
    }
    sectorUpdating = true;
  }

  !clockIsSet && setClock();
  clockIsSet && updateClock();

  function stopClock() {
    clearInterval(intervalId);
    intervalId = null;
    clearInterval(intervalId2);
    intervalId2 = null;
    sectorUpdating = false;
  }

  function stopSector() {
    clearInterval(intervalId2);
    intervalId2 = null;
    sectorUpdating = false;
  }

  function getHours(timeStamp) {
    const date = new Date(timeStamp);
    const hours = date.getHours() % 12;
    const rest = (date.getMinutes() * 60 + date.getSeconds()) / 3600;
    const timeInHours = Math.fround(hours + rest);
    return timeInHours;
  }

  function getAngle(timeStamp, factor) {
    const angle = getHours(timeStamp) * factor;
    return angle;
  }

  function transformSector() {
    const rawStartAngle = getAngle(timingProps.startValue, 30);
    const startAngle =
      rawStartAngle % 6 > 3
        ? rawStartAngle - (rawStartAngle % 6) + 6
        : rawStartAngle - (rawStartAngle % 6);

    const endPoint = timingProps.startValue + timingProps.timespan;
    const shortHandAngle = getAngle(endPoint, 30) - rawStartAngle;

    const sectorAngle = (shortHandAngle * 12) % 360;
    const secondHandAngle = Math.round((shortHandAngle * 720) % 360);
    const testHours = timingProps.timespan / 3600000;
    const sector1 = miniClock.querySelector('[data-js="sector-1"]');
    testHours < 0.0005 && sector1.classList.remove("sector--passive");

    if (testHours <= 0.0166666) {
      sector1.style.background = `conic-gradient(from ${startAngle}deg, darkorange ${secondHandAngle}deg, #0000 0%)`;
    } else if (testHours > 0.0166666 && testHours < 1) {
      sector1.style.background = `conic-gradient(from ${startAngle}deg, darkslategrey ${sectorAngle}deg, #0000 0%)`;
      const timespanOutput = document.querySelector(
        '[data-js="timespan-output"]'
      );
      timespanOutput.classList.add("timespan_darkslategrey");
    } else {
      sector1.style.background = `conic-gradient(from ${startAngle}deg, #a7df92 ${shortHandAngle}deg, #0000 0%)`;
      const timespanOutput = document.querySelector(
        '[data-js="timespan-output"]'
      );
      timespanOutput.classList.add("timespan_darkslategrey");
    }

    timingProps.started === false && stopSector();
  }

  function moveClock() {
    const currentSeconds = Math.round(Date.now() / 1000);
    const moveSeconds = currentSeconds - startSeconds;
    const moveMinutes = moveSeconds / 60;
    handleSecondHand(moveSeconds);
    moveBothHands(moveMinutes);
    startSeconds = currentSeconds;
    timingProps.started && !sectorUpdating ? updateSector() : null;
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
