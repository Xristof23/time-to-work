function createID(counter) {
  const unixDate = Date.now();
  const firstPart = Math.floor(unixDate / 1000);
  ++counter;
  const newId = firstPart + "C" + counter;
  console.log("newID", newId);
  return newId;
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

export { createID, properTimeFormatter };
