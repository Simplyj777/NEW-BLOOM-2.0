import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  calculateLifePath,
  calculatePersonalYear,
  getLifePathMeaning,
  getPersonalYearMeaning
} from "./numerology.js";

import {
  getChineseZodiac,
  getChineseZodiacMeaning
} from "./zodiac.js";

const fullName = document.getElementById("fullName");
const birthDate = document.getElementById("birthDate");
const currentYear = document.getElementById("currentYear");
const journalPrompt = document.getElementById("journalPrompt");

const generateAllBtn = document.getElementById("generateAllBtn");
const saveReadingBtn = document.getElementById("saveReadingBtn");

const lifePathResult = document.getElementById("lifePathResult");
const personalYearResult = document.getElementById("personalYearResult");
const numerologyReadingText = document.getElementById("numerologyReadingText");

const zodiacAnimalResult = document.getElementById("zodiacAnimalResult");
const zodiacReadingText = document.getElementById("zodiacReadingText");

const energyThemeResult = document.getElementById("energyThemeResult");
const energyReadingText = document.getElementById("energyReadingText");

const journalReflectionText = document.getElementById("journalReflectionText");
const fullReportText = document.getElementById("fullReportText");

const email = document.getElementById("email");
const password = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authStatus = document.getElementById("authStatus");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

let currentUser = null;
let latestReading = null;

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.tab;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((tab) => tab.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(targetId).classList.add("active");
  });
});

function getEnergyTheme(personalYearNumber, lifePathNumber) {
  if (personalYearNumber === 1) return "New Beginnings";
  if (personalYearNumber === 2) return "Emotional Alignment";
  if (personalYearNumber === 3) return "Creative Expansion";
  if (personalYearNumber === 4) return "Foundation Building";
  if (personalYearNumber === 5) return "Transformation and Change";
  if (personalYearNumber === 6) return "Healing and Love";
  if (personalYearNumber === 7) return "Spiritual Reflection";
  if (personalYearNumber === 8) return "Power and Abundance";
  if (personalYearNumber === 9) return "Release and Renewal";

  if (lifePathNumber === 7) return "Inner Wisdom";
  if (lifePathNumber === 11) return "Spiritual Awakening";
  return "Growth and Realignment";
}

function buildNumerologyReading(name, lifePath, personalYear) {
  return `${name}, your Life Path is ${lifePath}. ${getLifePathMeaning(
    lifePath
  )} Your Personal Year is ${personalYear}. ${getPersonalYearMeaning(
    personalYear
  )} This combination shows that your current season is asking you to grow with intention and trust your inner guidance.`;
}

function buildEnergyReading(name, energyTheme, focus) {
  return `${name}, your current energy theme is ${energyTheme}. Right now, your spirit may be pulling you toward deeper alignment, self-trust, and intentional choices. ${
    focus
      ? `Because your current focus is "${focus}," this is a reminder to pay attention to where your heart is asking for clarity and movement.`
      : "This is a reminder to pause, reflect, and listen to what keeps rising within you."
  }`;
}

function buildJournalReflection(name, focus, lifePath, personalYear) {
  return `${name}, journal on this: What is changing within me right now, and what am I being asked to trust more deeply? How can I honor my Life Path ${lifePath} energy while moving through Personal Year ${personalYear}? ${
    focus
      ? `How does my focus on "${focus}" connect to the lessons I am currently learning?`
      : "What patterns, desires, or truths keep repeating for me right now?"
  }`;
}

function buildFullReport(
  name,
  lifePath,
  personalYear,
  zodiacAnimal,
  energyTheme,
  focus
) {
  return `${name}, your New Bloom report shows that you are carrying the energy of Life Path ${lifePath}, which means ${getLifePathMeaning(
    lifePath
  ).toLowerCase()} Your Personal Year is ${personalYear}, showing that ${getPersonalYearMeaning(
    personalYear
  ).toLowerCase()} Your Chinese Zodiac is ${zodiacAnimal}, which means ${getChineseZodiacMeaning(
    zodiacAnimal
  ).toLowerCase()} Your current spiritual theme is ${energyTheme}, which points to a season of reflection, alignment, and meaningful growth. ${
    focus
      ? `At this time, your focus around "${focus}" may be one of the biggest areas where your spirit is asking you to become more honest, intentional, and open.`
      : "At this time, you are being encouraged to trust your process and listen closely to what your intuition has been showing you."
  }`;
}

generateAllBtn.addEventListener("click", () => {
  const nameValue = fullName.value.trim();
  const birthDateValue = birthDate.value;
  const yearValue = Number(currentYear.value);
  const focusValue = journalPrompt.value.trim();

  if (!nameValue || !birthDateValue || !yearValue) {
    alert("Please enter your name, birth date, and current year.");
    return;
  }

  const birthYearValue = Number(birthDateValue.split("-")[0]);
  const lifePath = calculateLifePath(birthDateValue);
  const personalYear = calculatePersonalYear(birthDateValue, yearValue);
  const zodiacAnimal = getChineseZodiac(birthYearValue);
  const energyTheme = getEnergyTheme(personalYear, lifePath);

  const numerologyText = buildNumerologyReading(nameValue, lifePath, personalYear);
  const zodiacText = `${nameValue}, your Chinese Zodiac is ${zodiacAnimal}. ${getChineseZodiacMeaning(
    zodiacAnimal
  )}`;
  const energyText = buildEnergyReading(nameValue, energyTheme, focusValue);
  const journalText = buildJournalReflection(
    nameValue,
    focusValue,
    lifePath,
    personalYear
  );
  const reportText = buildFullReport(
    nameValue,
    lifePath,
    personalYear,
    zodiacAnimal,
    energyTheme,
    focusValue
  );

  lifePathResult.textContent = lifePath;
  personalYearResult.textContent = personalYear;
  numerologyReadingText.textContent = numerologyText;

  zodiacAnimalResult.textContent = zodiacAnimal;
  zodiacReadingText.textContent = zodiacText;

  energyThemeResult.textContent = energyTheme;
  energyReadingText.textContent = energyText;

  journalReflectionText.textContent = journalText;
  fullReportText.textContent = reportText;

  latestReading = {
    name: nameValue,
    birthDate: birthDateValue,
    currentYear: yearValue,
    focus: focusValue,
    lifePath,
    personalYear,
    zodiacAnimal,
    energyTheme,
    numerologyText,
    zodiacText,
    energyText,
    journalText,
    fullReportText: reportText
  };
});

saveReadingBtn.addEventListener("click", async () => {
  if (!currentUser) {
    alert("Please log in first before saving your reading.");
    return;
  }

  if (!latestReading) {
    alert("Generate your reading first.");
    return;
  }

  try {
    await addDoc(collection(db, "readings"), {
      userId: currentUser.uid,
      email: currentUser.email,
      ...latestReading,
      createdAt: serverTimestamp()
    });

    alert("Your reading was saved.");
  } catch (error) {
    console.error(error);
    alert("Could not save reading. Check your Firebase setup.");
  }
});

signupBtn.addEventListener("click", async () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (!emailValue || !passwordValue) {
    alert("Please enter email and password.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
    alert("Account created successfully.");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

loginBtn.addEventListener("click", async () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (!emailValue || !passwordValue) {
    alert("Please enter email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, emailValue, passwordValue);
    alert("Logged in successfully.");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out.");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

onAuthStateChanged(auth, (user) => {
  currentUser = user;

  if (user) {
    authStatus.textContent = `Logged in as ${user.email}`;
  } else {
    authStatus.textContent = "Not logged in";
  }
});
