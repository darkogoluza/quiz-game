export function setUpAnswersCallbacks(correctAnswer) {
  if (correctAnswer == null || correctAnswer == undefined) return;
  $(".answare").click(function (e) {
    e.preventDefault();

    $(".question-feedback").text(
      `Answer is ${correctAnswer === $(e.target).text() ? "correct" : "wrong"}!`
    );

    $(".question-feedback-container").removeClass("hide-question-feedback");
    console.log(correctAnswer);

    $(".answare").each(function () {
      if ($(this).text() === correctAnswer) $(this).addClass("answare-correct");
      else if (e.target === this) $(this).addClass("answare-wrong");
      else $(this).addClass("answare-disable");
    });
  });
}
