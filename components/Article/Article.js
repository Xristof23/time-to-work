export default function Article(props) {
  const { headline, paragraph1 } = props;
  const paragraph2 = props.paragraph2 || "";
  const article = document.createElement("article");
  article.classList.add("article");
  article.innerHTML = /*html*/ `
    <p class="standard_text"> ${paragraph1} </p>
    <p class="standard_text"> ${paragraph2}  </p>
    `;

  return article;
}
