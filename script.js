// script.js

let appleCount = 0;
let clickPower = 1;
let autoCollectorInterval = null;
let currentQuest = null;
let goldCount = 0;

const startScreen = document.getElementById("start-screen");
const startGameButton = document.getElementById("start-game-button");
const exitGameButton = document.getElementById("exit-game-button");
const gameContainer = document.getElementById("game-container");
const clickButton = document.getElementById("click-button");
const appleCountDisplay = document.getElementById("apple-count");
const currencyCountDisplay = document.getElementById("currency-count");
const clickUpgradeButton = document.getElementById("click-upgrade");
const autoCollectorButton = document.getElementById("auto-collector");
const specialItemButton = document.getElementById("special-item");
const startQuestButton = document.getElementById("start-quest");
const questStatus = document.getElementById("quest-status");
const craftFertilizerButton = document.getElementById("craft-fertilizer");
const craftGoldenAppleButton = document.getElementById("craft-golden-apple");
const craftStatus = document.getElementById("craft-status");
const startMiniGameButton = document.getElementById("start-mini-game");
const miniGameStatus = document.getElementById("mini-game-status");
const startMultiplayerButton = document.getElementById("start-multiplayer");
const multiplayerStatus = document.getElementById("multiplayer-status");
const achievementClicker = document.getElementById("achievement-clicker");
const achievementCollector = document.getElementById("achievement-collector");

// Event listener to start the game
startGameButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
});

// Event listener to exit the game
exitGameButton.addEventListener("click", () => {
  alert("Спасибо за игру! До встречи в Кликере Королевства Яблок!");
  window.close(); // This will only work in certain browsers and configurations.
});

// Function to update apple and currency count display
function updateCounts() {
  appleCountDisplay.textContent = `Яблоки: ${appleCount}`;
  currencyCountDisplay.textContent = `Золото: ${goldCount}`;
}

// Click button logic
clickButton.addEventListener("click", () => {
  appleCount += clickPower;
  updateCounts();
  checkAchievements();
});

// Click Power Upgrade Logic
clickUpgradeButton.addEventListener("click", () => {
  if (appleCount >= 50) {
    appleCount -= 50;
    clickPower += 1;
    updateCounts();
    alert("Сила клика увеличена!");
  } else {
    alert("Недостаточно яблок для улучшения!");
  }
});

// Auto Collector Purchase Logic
autoCollectorButton.addEventListener("click", () => {
  if (appleCount >= 100) {
    appleCount -= 100;
    updateCounts();
    if (!autoCollectorInterval) {
      autoCollectorInterval = setInterval(() => {
        appleCount += 2; // Automated collection rate
        updateCounts();
        checkAchievements();
      }, 1000); // Collect apples every 1 second
      alert("Авто-Сборщик куплен! Яблоки собираются автоматически.");
    }
  } else {
    alert("Недостаточно яблок для покупки Авто-Сборщика!");
  }
});

// Special Item Purchase Logic
specialItemButton.addEventListener("click", () => {
  if (appleCount >= 500 && goldCount >= 10) {
    appleCount -= 500;
    goldCount -= 10;
    updateCounts();
    alert("Специальный предмет куплен!");
  } else {
    alert("Недостаточно ресурсов для покупки специального предмета!");
  }
});

// Quest Logic
startQuestButton.addEventListener("click", () => {
  if (!currentQuest) {
    currentQuest = {
      goal: 100,
      reward: 25,
      progress: 0
    };
    questStatus.textContent = `Активное задание: Соберите ${currentQuest.goal} яблок, чтобы получить ${currentQuest.reward} золота.`;
    updateQuest();
  } else {
    alert("Задание уже активно!");
  }
});

function updateQuest() {
  const questInterval = setInterval(() => {
    if (currentQuest && appleCount >= currentQuest.goal) {
      appleCount -= currentQuest.goal;
      goldCount += currentQuest.reward;
      currentQuest = null;
      questStatus.textContent = "Задание выполнено! Награда получена.";
      updateCounts();
      clearInterval(questInterval);
    }
  }, 500);
}

// Crafting Logic
craftFertilizerButton.addEventListener("click", () => {
  if (appleCount >= 150) {
    appleCount -= 150;
    updateCounts();
    craftStatus.textContent = "Создано специальное удобрение! Оно увеличивает будущие урожаи.";
  } else {
    alert("Недостаточно яблок для создания удобрения!");
  }
});

craftGoldenAppleButton.addEventListener("click", () => {
  if (appleCount >= 100 && goldCount >= 5) {
    appleCount -= 100;
    goldCount -= 5;
    updateCounts();
    craftStatus.textContent = "Создано золотое яблоко!";
  } else {
    alert("Недостаточно ресурсов для создания золотого яблока!");
  }
});

// Mini-Game Logic
startMiniGameButton.addEventListener("click", () => {
  miniGameStatus.textContent = "Мини-игра Ловец Яблок началась...";
  let applesCaught = 0;

  const miniGameInterval = setInterval(() => {
    applesCaught += Math.floor(Math.random() * 5) + 1; // Random apples caught
    if (applesCaught >= 50) {
      appleCount += 50;
      updateCounts();
      miniGameStatus.textContent = "Мини-игра завершена! Вы поймали 50 яблок!";
      clearInterval(miniGameInterval);
    }
  }, 1000); // Apples caught every 1 second
});

// Achievement Logic
function checkAchievements() {
  if (appleCount >= 100 && achievementClicker.textContent.includes("Не достигнуто")) {
    achievementClicker.textContent = "100 кликов - Достигнуто!";
    alert("Достижение разблокировано: 100 кликов!");
  }
  if (appleCount >= 1000 && achievementCollector.textContent.includes("Не достигнуто")) {
    achievementCollector.textContent = "Соберите 1000 яблок - Достигнуто!";
    alert("Достижение разблокировано: Соберите 1000 яблок!");
  }
}
