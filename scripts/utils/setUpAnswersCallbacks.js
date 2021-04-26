import { changeItem } from "./storageManager.js";
import { updateScore } from "./updateScore.js";

export function setUpAnswersCallbacks(correctAnswer) {
  if (correctAnswer == null || correctAnswer == undefined) return;

  $(".answare").click(function (e) {
    e.preventDefault();

    $(".question-feedback").text(
      `Answer is ${correctAnswer === $(e.target).text() ? "correct" : "wrong"}!`
    );
    if (correctAnswer === $(e.target).text()) {
      updateScore(changeItem("score", 1));
    }

    $(".question-feedback-container").removeClass("hide-question-feedback");

    $(".answare").each(function () {
      if ($(this).text() === correctAnswer) $(this).addClass("answare-correct");
      else if (e.target === this) $(this).addClass("answare-wrong");
      else $(this).addClass("answare-disable");
    });
  });
}
