//TODO: install const chalk = require('chalk');

require("dotenv").config();
const { HfInference } = require("@huggingface/inference");
const readline = require("readline");

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function formatResponse(response) {
  let text = response.generated_text.trim();

  const sentences = text.split(". ");
  const uniqueSentences = [...new Set(sentences)];
  text = uniqueSentences.join(". ");

  return text;
}

function showThinkingAnimation() {
  let dots = "";
  const interval = setInterval(() => {
    dots += ".";
    process.stdout.write(`🤖 Bot is thinking${dots}\r`);
    if (dots.length > 3) {
      dots = "";
    }
  }, 500);
  return interval;
}

async function askAI(question) {
  const thinkingInterval = showThinkingAnimation();

  try {
    const languageHint = "Please respond in English: ";
    const result = await hf.textGeneration({
      model: "EleutherAI/gpt-neo-2.7B",
      inputs: `${languageHint} ${question}`,
      parameters: { max_new_tokens: 100 },
    });

    clearInterval(thinkingInterval);

    const formattedText = formatResponse(result);
    console.log("\n🤖 Bot:", formattedText, "\n");
  } catch (error) {
    clearInterval(thinkingInterval);
    console.error("⚠️ Błąd:", error);
  }
}

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
