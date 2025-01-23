export default function Headline2(text) {
  const headline2 = document.createElement("h2");
  headline2.classList.add("headline2");
  headline2.setAttribute("id", "headline2");
  headline2.innerHTML = /*html*/ `
<span> 
${text}
</span>
`;
  return headline2;
}
