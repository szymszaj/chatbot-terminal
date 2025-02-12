function formatResponse(response) {
  let text = response.generated_text.trim();

  const sentences = text.split(". ");
  const uniqueSentences = [...new Set(sentences)];
  text = uniqueSentences.join(". ");

  return text;
}

module.exports = { formatResponse };
