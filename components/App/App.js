import Footer from "../Footer/Footer.js";
import FormContainer from "../FormContainer/FormContainer.js";
import Header from "../Header/Header.js";

export default function App() {
  const app = document.createElement("main");
  app.setAttribute("id", "app");
  app.classList.add("app");
  app.append(Header());
  app.append(FormContainer());
  app.append(Footer());
  return app;
}
