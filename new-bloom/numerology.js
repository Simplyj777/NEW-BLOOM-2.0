function reduceNumber(num) {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return num;
}

function calculateLifePath(birthDateString) {
  if (!birthDateString) return null;

  const digits = birthDateString.replaceAll("-", "").split("");
  const total = digits.reduce((sum, digit) => sum + Number(digit), 0);

  return reduceNumber(total);
}

function calculatePersonalYear(birthDateString, currentYear) {
  if (!birthDateString || !currentYear) return null;

  const [year, month, day] = birthDateString.split("-").map(Number);
  const monthDaySum = `${month}${day}`
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  const yearSum = currentYear
    .toString()
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  return reduceNumber(monthDaySum + yearSum);
}

function getLifePathMeaning(number) {
  const meanings = {
    1: "You are independent, bold, and naturally meant to lead.",
    2: "You are intuitive, emotionally aware, and connected to partnership energy.",
    3: "You are expressive, creative, and naturally connected to joy and communication.",
    4: "You are grounded, stable, and meant to build strong foundations.",
    5: "You are adventurous, freedom-seeking, and connected to transformation.",
    6: "You are nurturing, loving, and deeply tied to healing and responsibility.",
    7: "You are spiritual, reflective, wise, and drawn toward deep truth.",
    8: "You are powerful, ambitious, and tied to success, structure, and legacy.",
    9: "You are compassionate, intuitive, and connected to service and closure.",
    11: "You are intuitive and visionary, with a strong spiritual purpose.",
    22: "You are here to build something meaningful and lasting on a large scale.",
    33: "You are a teacher-healer energy, guided by compassion and upliftment."
  };

  return meanings[number] || "Your path holds unique lessons and deeper personal meaning.";
}

function getPersonalYearMeaning(number) {
  const meanings = {
    1: "This is a year of new beginnings, identity, and taking action.",
    2: "This is a year of emotional processing, patience, and relationship alignment.",
    3: "This is a year of creativity, social energy, expression, and visibility.",
    4: "This is a year of discipline, work, structure, and long-term planning.",
    5: "This is a year of change, movement, surprises, and expansion.",
    6: "This is a year of love, family, healing, beauty, and responsibility.",
    7: "This is a year of reflection, spiritual awakening, and deeper understanding.",
    8: "This is a year of power moves, finances, goals, and stepping up.",
    9: "This is a year of release, endings, emotional clearing, and preparation.",
    11: "This is an intuitive year of spiritual messages and alignment.",
    22: "This is a year to build something meaningful and practical.",
    33: "This is a year of deep healing, compassion, and service."
  };

  return meanings[number] || "This year is pushing you toward an important lesson.";
}

export {
  calculateLifePath,
  calculatePersonalYear,
  getLifePathMeaning,
  getPersonalYearMeaning
};
