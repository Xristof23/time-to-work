export default function Article(props) {
  const { paragraph1, id } = props;
  const paragraph2 = props.paragraph2 || "";
  const article = document.createElement("article");
  article.classList.add("article");
  article.setAttribute("id", `${id}`);
  article.innerHTML = /*html*/ `
    <p class="standard_text"> ${paragraph1} </p>
    <p class="standard_text"> ${paragraph2}  </p>
    `;

  return article;
}
