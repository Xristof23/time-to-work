import { whatContent } from "../../textContent.js";
import Article from "../Article/Article.js";

export default function What(props) {
  const { headline, id } = props;
  const what = document.createElement("section");
  what.classList.add("what");
  what.setAttribute("id", `${id}`);
  what.innerHTML = /*html*/ `
    <h2>${headline}<h2>

    `;
  what.appendChild(Article(whatContent));

  return what;
}
