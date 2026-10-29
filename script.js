const textList = [
  "Pinnacle strategy cascade meridian obsidian threshold momentum velocity spectrum galaxy baseline trajectory porcelain foundation standard envelope cathedral resonance dynamic landscape horizontal frequency vanguard silhouette horizon vertical perimeter magnitude umbrella",
  "Vanguard spectrum velocity obsidian trajectory baseline threshold strategy porcelain foundation cathedral resonance horizontal magnitude dynamic perimeter landscape frequency vertical standard envelope umbrella momentum pinnacle cascade meridian",
  "Trajectory baseline frequency obsidian foundation cathedral velocity spectrum perimeter threshold landscape vanguard standard horizontal magnitude momentum silhouette porcelain envelope resonance meridian strategy pinnacle cascade",
  "Labyrinth gargoyle obsidian strategy silhouette resonance momentum trajectory porcelain horizon pinnacle galaxy perimeter metaphor spectrum cascade threshold platinum foundation symphony cathedral meridian vanguard continuum",
  "Spectrum obsidian trajectory baseline threshold strategy porcelain foundation cathedral resonance horizontal magnitude dynamic perimeter landscape frequency vertical standard envelope umbrella momentum pinnacle cascade meridian vanguard",
  "Baseline frequency obsidian foundation cathedral velocity spectrum perimeter threshold landscape vanguard standard horizontal magnitude momentum silhouette porcelain envelope resonance meridian strategy pinnacle cascade trajectory",
  "Foundation cathedral velocity spectrum perimeter threshold landscape vanguard standard horizontal magnitude momentum silhouette porcelain envelope resonance meridian strategy pinnacle cascade trajectory baseline frequency obsidian",
  "Cathedral velocity spectrum perimeter threshold landscape vanguard standard horizontal magnitude momentum silhouette porcelain envelope resonance meridian strategy pinnacle cascade trajectory baseline frequency obsidian foundation",
  "Perimeter threshold landscape vanguard standard horizontal magnitude momentum silhouette porcelain envelope resonance meridian strategy pinnacle cascade trajectory baseline frequency obsidian foundation cathedral velocity spectrum",
  "Landscape vanguard standard horizontal magnitude momentum silhouette porcelain envelope resonance meridian strategy pinnacle cascade trajectory baseline frequency obsidian foundation cathedral velocity spectrum perimeter threshold",
  "Horizontal magnitude momentum silhouette porcelain envelope resonance meridian strategy pinnacle cascade trajectory baseline frequency obsidian foundation cathedral velocity spectrum perimeter threshold landscape vanguard standard",
  "Magnitude momentum silhouette porcelain envelope resonance meridian strategy pinnacle cascade trajectory baseline frequency obsidian foundation cathedral velocity spectrum perimeter threshold landscape vanguard standard horizontal",
  "Silhouette porcelain envelope resonance meridian strategy pinnacle cascade trajectory baseline frequency obsidian foundation cathedral velocity spectrum perimeter threshold landscape vanguard standard horizontal magnitude momentum",
  "Porcelain envelope resonance meridian strategy pinnacle cascade trajectory baseline frequency obsidian foundation cathedral velocity spectrum perimeter threshold landscape vanguard standard horizontal magnitude momentum silhouette",
  "Envelope resonance meridian strategy pinnacle cascade trajectory baseline frequency obsidian foundation cathedral velocity spectrum perimeter threshold landscape vanguard standard horizontal magnitude momentum silhouette porcelain"
];
let text = textList[Math.floor(Math.random() * textList.length)];

let totalTimeInSeconds = 60;
let timeLeft = totalTimeInSeconds;
let countdown, wpm, accuracy;

// input related elements
let textContainer = document.querySelector(".text-container");
let textInput = document.getElementById("textInput");
let startArea = document.querySelector(".start-btn");

// text elements
let timerInfo = document.querySelector(".timer-info");
let wpmInfo = document.querySelector(".wpm-info");
let accuracyInfo = document.querySelector(".accuracy-info");
let timeTakenInfo = document.querySelector(".time-taken-info");

// button elements
let startBtn = document.querySelector(".start-test");
let endBtn = document.querySelector(".end-test");
let closeCardBtn = document.querySelector(".close-card");
let testCard = document.querySelector(".test-card");

function initialize() {
  timerInfo.textContent = timeLeft;
  textContainer.innerHTML = '';
  text.split('').forEach(char => {
    let span = document.createElement('span');
    span.textContent = char;
    textContainer.appendChild(span);
  });
}

document.addEventListener("DOMContentLoaded", () => initialize());

closeCardBtn.onclick = () => {
  testCard.style.display = 'none';
}

function start() {
  startArea.style.display = 'none';
  clearInterval(countdown);
  textInput.focus();
  endBtn.disabled = false;

  countdown = setInterval(() => {
    timeLeft--;
    timerInfo.textContent = timeLeft;

    if (timeLeft <= 0) {
      end();
      clearInterval(countdown);
    }
  }, 1000);
}

startBtn.onclick = () => start();

textInput.oninput = (e) => {
  let typedValue = e.target.value;

  let letters = document.querySelectorAll(".text-container > span");

  if (e.inputType && e.inputType.startsWith("delete")) {
    letters.forEach((x, i) => {
      if (i >= typedValue.length) {
        x.classList.remove('correct', 'incorrect');
      }
    });
    // return;
  }

  typedValue.split("").forEach(async (x, i) => {
    if (i >= letters.length) return;

    if (letters[i].textContent == x) {
      letters[i].classList.remove('incorrect');
      letters[i].classList.add('correct');
    } else {
      if (letters[i].textContent === ' ') {
        letters[i].textContent = x;
        letters[i].classList.remove('correct');
      }
      letters[i].classList.remove('correct');
      letters[i].classList.add('incorrect');
    }
  });

  letters.forEach(x => x.classList.remove('current'));

  if (typedValue.length < letters.length) {
    letters[typedValue.length].classList.add('current');
  }

  if (timeLeft <= 0 || typedValue.length >= text.length) end();
}

function end() {
  endBtn.disabled = true;
  testCard.style.display = 'flex';
  textInput.disabled = true;
  clearInterval(countdown);

  let correctChars = document.querySelectorAll(".text-container > span.correct").length;
  let totalTyped = textInput.value.length;
  let timeTakenInSeconds = totalTimeInSeconds - timeLeft;

  accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
  wpm = Math.round((correctChars / 5) / (timeTakenInSeconds / 60));

  wpmInfo.textContent = 'WPM : ' + wpm;
  accuracyInfo.textContent = 'Accuracy : ' + accuracy + '%';
  timeTakenInfo.textContent = 'Time Taken : ' + (timeTakenInSeconds) + ' seconds';
}

endBtn.onclick = () => end();
