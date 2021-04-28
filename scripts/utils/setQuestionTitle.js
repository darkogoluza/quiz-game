export function setQuestionTitle(title) {
  if (title == null || title == undefined) return;
  $(".question-title").html(title);
}
