function getChineseZodiac(year) {
  const zodiacs = [
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat"
  ];

  return zodiacs[year % 12];
}

function getChineseZodiacMeaning(animal) {
  const meanings = {
    Rat: "You are clever, resourceful, sharp-minded, and naturally observant.",
    Ox: "You are strong, dependable, grounded, and steady in your growth.",
    Tiger: "You are bold, magnetic, passionate, and driven by courage.",
    Rabbit: "You are gentle, intuitive, thoughtful, and emotionally graceful.",
    Dragon: "You are powerful, creative, vibrant, and naturally influential.",
    Snake: "You are wise, mysterious, strategic, and deeply intuitive.",
    Horse: "You are energetic, independent, adventurous, and freedom-loving.",
    Goat: "You are artistic, compassionate, sensitive, and emotionally rich.",
    Monkey: "You are clever, playful, adaptable, and naturally innovative.",
    Rooster: "You are confident, expressive, detailed, and highly aware.",
    Dog: "You are loyal, honest, protective, and guided by strong values.",
    Pig: "You are generous, warm-hearted, sincere, and connected to abundance."
  };

  return meanings[animal] || "Your zodiac carries a meaningful spiritual message.";
}

export { getChineseZodiac, getChineseZodiacMeaning };
