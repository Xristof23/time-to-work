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
};

function saveToLocalStorage(name, data) {
  const backupName = name || "TasksBackup";
  localStorage.setItem(backupName, JSON.stringify(data));
}

// max: max positiv integer?
function generateRandomInteger(max, min) {
  const minNumber = Number(min) || 0;
  const maxNumber = Number(max);
  const range = Math.abs(Math.round(maxNumber - minNumber));
  const withinRange = Math.ceil(Math.random() * range);
  const randomInteger = minNumber + withinRange;
  return randomInteger;
}

function properTimeFormatter(timeInMs, options) {
  const allSeconds = Math.round(timeInMs / 1000);
  const rawSeconds = Math.floor(allSeconds % 60);
  const seconds = rawSeconds.toLocaleString("en-US", {
    minimumIntegerDigits: allSeconds < 60 && rawSeconds < 10 ? 1 : 2,
    useGrouping: false,
  });

  const rawHours = allSeconds < 3600 ? 0 : Math.floor(allSeconds / 3600);
  const hours = rawHours.toLocaleString("en-US", {
    minimumIntegerDigits: rawHours < 10 ? 1 : 2,
    useGrouping: false,
  });

  const rawMinutes =
    allSeconds < 60 ? 0 : Math.floor((allSeconds - rawHours * 3600) / 60);
  const minutes = rawMinutes.toLocaleString("en-US", {
    minimumIntegerDigits: allSeconds < 3600 && rawMinutes < 10 ? 1 : 2,
    useGrouping: false,
  });

  const unit = allSeconds < 60 ? "sec" : allSeconds < 3600 ? "min" : "hours";
  const formattedTime =
    allSeconds < 60
      ? `${seconds} ${unit}`
      : allSeconds < 3600
      ? `${minutes}:${seconds} ${unit}`
      : `${hours}:${minutes}:${seconds} ${unit}`;
  return formattedTime;
}

function createUnixTimeID(unixTime) {
  const unixDate = unixTime || Date.now();
  const firstNumber = Math.round(unixDate / 1000);
  const firstPart = firstNumber.toString().slice(3);
  const randomNr = Math.floor(Math.random() * 1000);
  const secondPart = randomNr.toLocaleString("en-US", {
    minimumIntegerDigits: 3,
    useGrouping: false,
  });
  const newId = Number(firstPart + secondPart);
  return newId;
}

function disappearListContainer() {
  const listContainer = document.getElementById("list-container");
  listContainer.classList.add("list_container--passive");
}

export {
  properTimeFormatter,
  createUnixTimeID,
  disappearListContainer,
  dateOptions,
  timeOptions,
  generateRandomInteger,
  saveToLocalStorage,
};
