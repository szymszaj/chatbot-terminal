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

module.exports = { showThinkingAnimation };
