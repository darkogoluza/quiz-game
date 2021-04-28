import { getQuizData } from "./utils/getQuizData.js";
import { setQuestionTitle } from "./utils/setQuestionTitle.js";
import { addAnswersButton } from "./utils/addAnswerButton.js";
import { updateQuestionNumber } from "./utils/updateQuestionNumber.js";
import { getItem, setItem, changeItem } from "./utils/storageManager.js";
import { SelectBox } from "./utils/selectBox.js";
import { updateDifficulty } from "./utils/updateDifficulty.js";
import { categoryNameToId } from "./utils/categoryNameToId.js";
import { updateScore } from "./utils/updateScore.js";

async function startQuiz({
  difficulty = "easy",
  amount = 10,
  category = 9,
} = {}) {
  const data = await getQuizData({
    difficulty: difficulty.toLowerCase(),
    category: category,
    amount: amount,
  });
  updateDifficulty(difficulty);

  setItem("score", 0);
  setItem("currentQuestion", 0);
  setItem("questionsAmount", data.length);

  updateScore(getItem("score"));

  run(data);
}

function run(data) {
  const currentQuestionIndex = getItem("currentQuestion");

  loadQuestion(data[currentQuestionIndex]);
  updateQuestionNumber(currentQuestionIndex, data.length);
  setUpNextQuestionButton(data);

  startTime = new Date();
  $(".next-question").text("Next Question");
}

function loadQuestion(questionData) {
  const answers = [
    questionData.correct_answer,
    ...questionData.incorrect_answers,
  ];
  setQuestionTitle(questionData.question);
  addAnswersButton(answers);
}

let startTime = null;
function setUpNextQuestionButton(data) {
  $(".next-question").click(function (e) {
    e.preventDefault();
    changeItem("currentQuestion", 1);

    const currentQuestionIndex = getItem("currentQuestion");

    if (currentQuestionIndex >= data.length) {
      $(".quiz").removeClass("quiz-show");
      $(".question-feedback-container").addClass("hide-question-feedback");
      $(".question-feedback-container").css("display", "block");
      setUpResoult();

      setTimeout(() => {
        $(".results").addClass("results-show");
        $(".quiz").css("display", "none");
        $(".results").css("display", "block");
      }, 400);
      return;
    }

    loadQuestion(data[currentQuestionIndex]);
    updateQuestionNumber(currentQuestionIndex, data.length);

    $(".question-feedback-container").addClass("hide-question-feedback");
  });
}

const difficultyBox = new SelectBox("#difficulty", {
  name: "Difficulty",
  defaultValue: 0,
});

const categoryBox = new SelectBox("#category", {
  name: "Category",
  defaultValue: 0,
});

$(".start-quiz").click(async function (e) {
  e.preventDefault();
  $(".intro").addClass("hide-intro");

  $(".quiz").css("display", "block");
  setTimeout(async () => {
    await startQuiz({
      difficulty: difficultyBox.activeOptionId,
      category: categoryNameToId(categoryBox.activeOptionId),
      amount: 10,
    });
    $(".quiz").addClass("quiz-show");
    $(".intro").css("display", "none");
  }, 400);
});

$(".play-again").click(function (e) {
  e.preventDefault();

  $(".results").removeClass("results-show");
  setTimeout(() => {
    location.reload();
  }, 400);
});

function setUpResoult() {
  $(".results__score").text(
    `Correctly answerd ${getItem("score")} of ${getItem("questionsAmount")}`
  );
  $(".results__difficulty").text(`Difficulty: ${difficultyBox.activeOptionId}`);
  const deltaTime = new Date().getTime() - startTime.getTime();
  const seconds = Math.round(deltaTime / 1000);
  let minutes = 0;
  if (seconds > 60) {
    minutes = seconds / 60;
  }
  $(".results__time").text(
    `You finished in ${
      minutes > 0
        ? minutes > 1
          ? `${minutes} minutes and `
          : `${minutes} minute and `
        : ""
    }${seconds}s`
  );
}
