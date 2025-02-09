const wantedDelete = {
  text: "Do you really want to delete this entry? This is not reversible! Press &quot;No, cancel.&quot;, if you are not sure to delete entry with id ",
  button1: "No, cancel.",
  button2: "Yes, go on.",
  mode: "delete",
};

const wantedDeleteAll = {
  text: "Do you really want to delete all entries? This is not reversible! Press &quot;No, cancel.&quot;, if you are not sure!",
  button1: "No, cancel.",
  button2: "Yes, go on.",
  mode: "deleteAll",
};

const wantedReset = {
  text: "Do you really want to reset? Your entry has not been saved yet! Press No, abort., if you are not sure!",
  button1: "No, cancel.",
  button2: "Yes, go on.",
  mode: "reset",
};

const resetTime = {
  text: "Do you really want to reset? Your entry has not been saved yet! Press No, abort., if you are not sure!",
  button1: "No, cancel.",
  button2: "Yes, go on.",
  mode: "resetTime",
};

const wantedSave = {
  text: "Please press the start button first!",
  button1: "Ok",
  mode: "save",
};

const chooseBackup = {
  text: "Choose the backup you want to load!",
  button1: "No, cancel.",
  button2: "TaskBackup",
  button3: "AutomaticBackup",
  mode: "chooseBackup",
};

const madeBackup = {
  text: "Backup successfully saved.",
  button1: "Ok",
  mode: "madeBackup",
};

const noEntries = {
  text: "There are no entries in this list",
  button1: "Ok",
  mode: "noEntries",
};

const afterSave = {
  text: "Your entry has been saved. What do you want to do next? (If you're working, you might want to take a break ...)",
  button1: "Nothing.",
  button2: "Stay here and start the next task.",
  button3: "Take me to the done tasks.",
  mode: "afterSave",
};

const wantedStart = {
  text: "The timer is already running!",
  button1: "Ok",
  mode: "noStart",
};

const modalContentList = [
  afterSave,
  resetTime,
  wantedDelete,
  wantedReset,
  wantedSave,
  wantedStart,
  wantedDeleteAll,
  noEntries,
  madeBackup,
  chooseBackup,
];

export { modalContentList };
