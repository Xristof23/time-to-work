import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import ListContainer from "../ListContainer/ListContainer.js";
import MainTiming from "../MainTiming/MainTiming.js";

const userEntries = JSON.parse(localStorage.getItem("RecordedTasks")) || [];

export default function App() {
  const app = document.createElement("main");
  app.setAttribute("id", "app");
  app.classList.add("app");
  app.append(Header());
  app.append(ListContainer(userEntries));
  // app.append(MainTiming());
  app.append(Footer());
  return app;
}
