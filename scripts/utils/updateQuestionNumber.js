export function updateQuestionNumber(questionIndex, quesstionLength) {
  $(".question-number").text(
    `Question ${parseInt(questionIndex) + 1} of ${quesstionLength}`
  );
}
