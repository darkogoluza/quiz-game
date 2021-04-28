import { setUpAnswersCallbacks } from "./setUpAnswersCallbacks.js";
import { shuffle } from "./shuffle.js";

export function addAnswersButton(answers) {
  if (answers == null || answers.length === 0 || answers == undefined) return;

  $(".answare").remove();
  const correctAnswer = answers[0];
  shuffle(answers);

  const html = answers
    .map((answer) => {
      return `<button class="answare">${answer}</button>`;
    })
    .join("");
  $(".answers-container").append(html);

  setUpAnswersCallbacks(correctAnswer);
}
