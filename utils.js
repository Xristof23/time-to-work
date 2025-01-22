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

function createUID() {
  const unixDate = Date.now();
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

// one of the two following wil be redundant

function disappearListContainer() {
  const listContainer = document.getElementById("list-container");
  listContainer.classList.add("list_container--passive");
  console.log("reached disappear");
}

function hideElement(id) {
  const element = document.getElementById(id);
  element.style.display("none");
  console.log("Element hidden");
}

export { properTimeFormatter, createUID, hideElement, disappearListContainer };
