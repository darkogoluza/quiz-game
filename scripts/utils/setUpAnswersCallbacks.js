import { changeItem, getItem } from "./storageManager.js";
import { updateScore } from "./updateScore.js";

export function setUpAnswersCallbacks(correctAnswer) {
  if (correctAnswer == null || correctAnswer == undefined) return;

  $(".answare").click(function (e) {
    e.preventDefault();

    $(".question-feedback").html(
      `Answer is ${
        correctAnswer === $(e.target).text()
          ? `<span style="color:#5eaaa8;">correct!</span>`
          : `<span style="color:#f05945;">wrong!</span>`
      }`
    );
    if (correctAnswer === $(e.target).text()) {
      updateScore(changeItem("score", 1));
    }

    $(".question-feedback-container").removeClass("hide-question-feedback");
    if (
      parseInt(getItem("currentQuestion")) >=
      parseInt(getItem("questionsAmount")) - 1
    ) {
      $(".next-question").text("See results");
    }

    $(".answare").each(function () {
      if ($(this).text() === correctAnswer) $(this).addClass("answare-correct");
      else if (e.target === this) $(this).addClass("answare-wrong");
      else $(this).addClass("answare-disable");
    });
  });
}
