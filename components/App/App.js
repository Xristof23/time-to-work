import Header from "../Header/Header.js";
import Headline2 from "../Headline2/Headline2.js";
import MainTiming from "../MainTiming/MainTiming.js";
import TimeRecords from "../TimeRecords/TimeRecords.js";

export default function App() {
  const app = document.createElement("main");
  app.classList.add("app");
  app.append(Header(), MainTiming(), Headline2("My entries"), TimeRecords());
  return app;
}
