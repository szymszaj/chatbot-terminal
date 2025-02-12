const { HfInference } = require("@huggingface/inference");
const { formatResponse } = require("./formatResponse");
const { showThinkingAnimation } = require("./showThinkingAnimation");

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

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

module.exports = { askAI };
