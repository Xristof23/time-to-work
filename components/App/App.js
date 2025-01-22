import Header from "../Header/Header.js";
import MainTiming from "../MainTiming/MainTiming.js";
import Menu from "../Menu/Menu.js";

export default function App() {
  const app = document.createElement("main");
  app.classList.add("app");
  app.append(Header(), Menu(), MainTiming());

  return app;
}
