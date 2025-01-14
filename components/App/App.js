import Header from "../Header/Header.js";
import MainTiming from "../MainTiming/MainTiming.js";
import TimeRecords from "../TimeRecords/TimeRecords.js";

export default function App() {
  const app = document.createElement("main");
  app.classList.add("app");
  app.append(Header(), MainTiming(), TimeRecords());
  return app;
}
