export function updateScore(value) {
  console.log(value);
  $(".quiz-score").text(`Correct answers: ${value}`);
}
