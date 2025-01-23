import Header from "../Header/Header.js";
import MainTiming from "../MainTiming/MainTiming.js";

export default function App() {
  const app = document.createElement("main");
  app.setAttribute("id", "app");
  app.classList.add("app");
  app.append(Header());

  return app;
}
