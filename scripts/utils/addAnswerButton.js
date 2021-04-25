import { setUpAnswersCallbacks } from "./setUpAnswersCallbacks.js";

export function addAnswersButton(answers) {
  if (answers == null || answers.length === 0 || answers == undefined) return;

  $(".answare").remove();

  const html = answers
    .map((answer) => {
      return `<button class="answare">${answer}</button>`;
    })
    .join("");

  $(".answers-container").append(html);

  setUpAnswersCallbacks(answers[0]);
}
