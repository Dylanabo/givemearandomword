const express = require("express");
const app = express();

// Define an array of words to choose from
const en_words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "peach",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "watermelon",
];

const fr_words = [
  "abricot",
  "abricot",
  "banane",
  "cerise",
  "datte",
  "eglantier",
  "figue",
  "raisin",
  "melon",
  "kiwi",
  "citron",
  "mangue",
  "nectarine",
  "orange",
  "peche",
  "coing",
  "framboise",
  "fraise",
  "mandarine",
  "pasteque",
];
// Define a function to filter words by length
function filterWordsByLength(words, length) {
  return words.filter((word) => word.length === length);
}

// Define a function to filter words by difficulty
function filterWordsByDifficulty(words, difficulty) {
  switch (difficulty) {
    case "easy":
      return words.filter((word) => word.length <= 5);
    case "medium":
      return words.filter((word) => word.length > 5 && word.length <= 8);
    case "hard":
      return words.filter((word) => word.length > 8);
    default:
      return words;
  }
}

// Define a route that accepts parameters for word length and difficulty
app.get("/word", (req, res) => {
  const { length, difficulty, lang } = req.query;

  let filteredWords = lang == "fr" ? fr_words: en_words;

  if (length) {
    filteredWords = filterWordsByLength(filteredWords, parseInt(length));
  }

  if (difficulty) {
    filteredWords = filterWordsByDifficulty(filteredWords, difficulty);
  }

  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  const randomWord = filteredWords[randomIndex];

  res.send(randomWord);
});

app.get("/", (req, res) => {
  res.send("This is a random word generator API.");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
