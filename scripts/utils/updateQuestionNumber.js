export function updateQuestionNumber(questionIndex, quesstionLength) {
  $(".question-number").text(
    `Question ${questionIndex + 1} of ${quesstionLength}`
  );
}
