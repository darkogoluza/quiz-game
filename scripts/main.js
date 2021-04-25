import { getQuizData } from "./utils/getQuizData.js";
import { setQuestionTitle } from "./utils/setQuestionTitle.js";
import { addAnswersButton } from "./utils/addAnswerButton.js";

(async () => {
  const data = await getQuizData();
  const correctAnswer = data[0].correct_answer;
  const answers = [correctAnswer, ...data[0].incorrect_answers];
  console.log(data);

  setQuestionTitle(data[0].question);
  setUpAnswersCallbacks(correctAnswer);
  addAnswersButton(answers);
})();

function setUpAnswersCallbacks(correctAnswer) {
  if (correctAnswer == null || correctAnswer == undefined) return;
  $(".options-container").each(function () {
    $(this).click(function (e) {
      e.preventDefault();
      correctAnswer === $(e.target).text()
        ? console.log("Correct!")
        : console.log("Wrong!");
    });
  });
}
