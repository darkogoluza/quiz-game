import { getQuizData } from "./utils/getQuizData.js";
import { setQuestionTitle } from "./utils/setQuestionTitle.js";
import { addAnswersButton } from "./utils/addAnswerButton.js";
import { updateQuestionNumber } from "./utils/updateQuestionNumber.js";

let currentQuestionIndex = 0;

async function start() {
  const data = await getQuizData();
  currentQuestionIndex = 0;
  run(data);
}

function run(data) {
  loadQuestion(data[currentQuestionIndex]);
  updateQuestionNumber(currentQuestionIndex, data.length);

  $(".next-question").click(function (e) {
    e.preventDefault();
    currentQuestionIndex++;
    if (currentQuestionIndex >= data.length) return;

    loadQuestion(data[currentQuestionIndex]);
    updateQuestionNumber(currentQuestionIndex, data.length);

    $(".question-feedback-container").addClass("hide-question-feedback");
  });
}

function loadQuestion(questionData) {
  const answers = [
    questionData.correct_answer,
    ...questionData.incorrect_answers,
  ];
  setQuestionTitle(questionData.question);
  addAnswersButton(answers);
}

start();
