require("dotenv").config();
const readline = require("readline");
const { askAI } = require("./askAI");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  rl.question("\n💬 You: ", async (question) => {
    if (question.toLowerCase() === "goodbye") {
      console.log("\n👋 Bot: Goodbye!\n");
      rl.close();
    } else {
      await askAI(question);
      askQuestion();
    }
  });
}

console.log("🤖 Welcome! You can ask questions now.\n");
askQuestion();
