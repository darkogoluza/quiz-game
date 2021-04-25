export function addAnswersButton(answers) {
  const html = answers
    .map((answer) => {
      return `<p>${answer}</p>`;
    })
    .join("");
  $(".options-container").append(html);
}
