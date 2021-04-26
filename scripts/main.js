import { getQuizData } from "./utils/getQuizData.js";
import { setQuestionTitle } from "./utils/setQuestionTitle.js";
import { addAnswersButton } from "./utils/addAnswerButton.js";
import { updateQuestionNumber } from "./utils/updateQuestionNumber.js";
import { getItem, setItem, changeItem } from "./utils/storageManager.js";
import { SelectBox } from "./utils/selectBox.js";
import { updateDifficulty } from "./utils/updateDifficulty.js";

async function startQuiz({
  difficulty = "easy",
  amount = 10,
  category = 9,
} = {}) {
  const data = await getQuizData({ difficulty: difficulty.toLowerCase() });
  updateDifficulty(difficulty);

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

const difficultyBox = new SelectBox("#difficulty", {
  name: "Difficulty",
  defaultValue: 0,
});

$(".start-quiz").click(async function (e) {
  e.preventDefault();
  $(".intro").toggle(400);
  setTimeout(async () => {
    await startQuiz({ difficulty: difficultyBox.activeOptionId });
    $(".quiz").addClass("quiz-show");
  }, 400);
});
