import { getQuizData } from "./utils/getQuizData.js";
import { setQuestionTitle } from "./utils/setQuestionTitle.js";
import { addAnswersButton } from "./utils/addAnswerButton.js";
import { updateQuestionNumber } from "./utils/updateQuestionNumber.js";
import { getItem, setItem, changeItem } from "./utils/storageManager.js";

async function start() {
  const data = await getQuizData();

  setItem("score", 0);
  setItem("currentQuestion", 0);

  run(data);
}

function run(data) {
  const currentQuestionIndex = getItem("currentQuestion");

  loadQuestion(data[currentQuestionIndex]);
  updateQuestionNumber(currentQuestionIndex, data.length);
  setUpNextQuestionButton(data);
}

function loadQuestion(questionData) {
  const answers = [
    questionData.correct_answer,
    ...questionData.incorrect_answers,
  ];
  setQuestionTitle(questionData.question);
  addAnswersButton(answers);
}

function setUpNextQuestionButton(data) {
  $(".next-question").click(function (e) {
    e.preventDefault();
    changeItem("currentQuestion", 1);

    const currentQuestionIndex = getItem("currentQuestion");

    if (currentQuestionIndex >= data.length) return;

    loadQuestion(data[currentQuestionIndex]);
    updateQuestionNumber(currentQuestionIndex, data.length);

    $(".question-feedback-container").addClass("hide-question-feedback");
  });
}

start();
