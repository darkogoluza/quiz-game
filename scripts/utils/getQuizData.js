export async function getQuizData({
  difficulty = "easy",
  amount = 10,
  category = 9,
} = {}) {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
  );
  const data = await res.json();
  return await data.results;
}
