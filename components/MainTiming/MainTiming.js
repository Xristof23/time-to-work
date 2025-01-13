let startValue;

const today = new Date();

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const timeOptions = {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",

  //   fractionalSecondDigits: 2,
};

const localDate = today.toLocaleDateString("en-EN", dateOptions);
const localTime = today.toLocaleTimeString("en-EN", timeOptions);

export default function MainTiming() {
  const mainTiming = document.createElement("section");
  mainTiming.classList.add("mainTiming");
  mainTiming.innerHTML = /*html*/ `
    <p> 
    Explain later how this works
    </p>
    <p> Date: ${localDate}
    </p>
    <p>Time : ${localTime}
    </p> 
   <p>Start : <output data-js="start-output"></output></p> 
   <p>End : <output data-js="end-output"></output></p> 
   <p>Time spent : <output data-js="time-output"></output></p> 
   
    <button type="button" data-js="start-button">
    Start 
    </button>
    <button type="button" class="stop_button" data-js="stop-button">
    Stop
    </button>`;

  const startOutput = mainTiming.querySelector('[data-js="start-output"]');
  const timeOutput = mainTiming.querySelector('[data-js="time-output"]');
  const endOutput = mainTiming.querySelector('[data-js="end-output"]');

  const startButton = mainTiming.querySelector('[data-js="start-button"]');

  function handleStart() {
    startValue = Date.now();
    const startDate = new Date(startValue);
    const startTime = startDate.toLocaleTimeString("en-EN", timeOptions);

    startOutput.textContent = startTime;
  }

  startButton.addEventListener("click", handleStart);

  const stopButton = mainTiming.querySelector('[data-js="stop-button"]');

  function properTimeFormatter(timeInMs, options) {
    const allSeconds = Math.round(timeInMs / 1000);
    const seconds = Math.floor(allSeconds % 1000);
    const allMinutes = Math.floor(allSeconds / 60);
    const hours = Math.floor(allMinutes / 60);
    const minutes = Math.floor(allMinutes % 60);
    const unit =
      hours === 0 && minutes === 0 ? "sec" : hours === 0 ? "min" : "hours";
    const formattedTime = `${hours}:${minutes}:${seconds} ${unit}`;
    return formattedTime;
  }

  function handleStop() {
    const endValue = Date.now();
    const elapsedMs = endValue - startValue;
    const formattedTime = properTimeFormatter(elapsedMs);
    const endDate = new Date(endValue);
    const formattedEnd = endDate.toLocaleTimeString("en-EN", timeOptions);
    endOutput.textContent = formattedEnd;
    timeOutput.textContent = formattedTime;
  }

  stopButton.addEventListener("click", handleStop);

  return mainTiming;
}
