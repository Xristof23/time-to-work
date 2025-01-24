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

const reallyDeleteAll = {
  text: "Really delete? THIS IS NOT REVERSIBLE! Press &quot;No, cancel.&quot;, if you are not sure!",
  button1: "No, cancel.",
  button2: "Yes, really delete ALL tasks.",
  mode: "reallyDeleteAll",
};

const wantedReset = {
  text: "Do you really want to reset? Your entry has not been saved yet! Press No, abort., if you are not sure!",
  button1: "No, cancel.",
  button2: "Yes, go on.",
  mode: "reset",
};

const wantedSave = {
  text: "Please press the start button first!",
  button1: "Ok",
  mode: "save",
};

const wantedStart = {
  text: "The timer is already running!",
  button1: "Ok",
  mode: "save",
};

const wantTest = {
  text: "This is only a test. Not much to see, huh?",
  button1: "Ok",
  mode: "test",
};

export {
  wantedDelete,
  wantedReset,
  wantedSave,
  wantedStart,
  wantTest,
  wantedDeleteAll,
  reallyDeleteAll,
};
