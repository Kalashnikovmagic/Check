let currentMode = "before";
let currentFormat = "micro";

const clothes = {
  name: "👔 Одежда",
  items: ["Рубашка / футболка", "Пиджак", "Брюки", "Туфли", "Носки", "Браслеты и кольца"]
};

const microphone = {
  name: "🎤 Микрофон",
  items: ["Зарядить батарейки", "Передатчик", "База", "Головная гарнитура", "Кабель XLR", "Блок питания", "Флешка"]
};

const microMagic = {
  name: "🎩 Микромагия",
  items: ["Чемодан", "Штатив", "Колоды обычные", "Колоды Svengali", "StandUp Monte", "MentalDie", "Симпсоны", "Leviosa"]
};

const venomCube = { name: "🎲 VenomCube", items: ["Кубики", "Пакет"] };
const dynamite = { name: "🧨 Динамит", items: ["Шашка", "Лента", "Очки", "Скотч", "Карты", "Фитиль"] };
const prestige = { name: "📑 Престиж", items: ["Престиж"] };
const iphone = { name: "📱 iPhone", items: ["Коробка", "Пакет", "Муляж", "Платок", "Болгарка"] };
const bookTest = { name: "📕 Буктест", items: ["Книги"] };
const staplers = { name: "🛠️ Степлеры", items: ["Мешок", "Степлеры", "Скобы", "Доска", "Карты"] };
const fireworks = { name: "🎆 Салют", items: ["Салют", "Зажигалка"] };

const checklists = {
  micro: {
    title: "Микромагия",
    categories: [clothes, microphone, microMagic]
  },
  scene: {
    title: "Сцена",
    categories: [clothes, microphone, venomCube, prestige, iphone, bookTest, fireworks]
  },
  scenePlus: {
    title: "Сцена+",
    categories: [clothes, microphone, dynamite, prestige, iphone, bookTest, staplers, venomCube, fireworks]
  },
  scenePlusMicro: {
    title: "Сцена+микро",
    categories: [clothes, microphone, microMagic, venomCube, dynamite, prestige, iphone, bookTest, staplers, fireworks]
  }
};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function openMode(mode) {
  currentMode = mode;
  document.getElementById("mode-title").innerText =
    mode === "before" ? "На выступление" : "После выступления";
  showScreen("format-screen");
}

function goHome() {
  showScreen("home-screen");
}

function openChecklist(format) {
  currentFormat = format;
  document.getElementById("format-title").innerText = checklists[format].title;
  clearWarning();
  renderChecklist();
  showScreen("checklist-screen");
}

function getStorageKey() {
  return `magic_${currentMode}_${currentFormat}`;
}

function renderChecklist() {
  const container = document.getElementById("checklist-container");
  container.innerHTML = "";

  const saved = JSON.parse(localStorage.getItem(getStorageKey())) || {};

  checklists[currentFormat].categories.forEach(category => {
    const block = document.createElement("div");
    block.className = "category";

    const title = document.createElement("div");
    title.className = "category-title";
    title.innerText = "▼ " + category.name;

    const items = document.createElement("div");
    items.className = "category-items";

    title.onclick = () => {
      items.style.display = items.style.display === "none" ? "block" : "none";
    };

    category.items.forEach(item => {
      const row = document.createElement("label");
      row.className = "item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.dataset.item = item;
      checkbox.checked = !!saved[item];

      const text = document.createElement("span");
      text.textContent = item;

      row.append(checkbox, text);
      items.appendChild(row);
    });

    block.append(title, items);
    container.appendChild(block);
  });

  updateProgress();
  updateCategories();
}

document.addEventListener("change", event => {
  if (!event.target.matches("#checklist-container input")) return;

  const saved = JSON.parse(localStorage.getItem(getStorageKey())) || {};
  saved[event.target.dataset.item] = event.target.checked;
  localStorage.setItem(getStorageKey(), JSON.stringify(saved));

  updateProgress();
  updateCategories();
});

function updateProgress() {
  const checks = document.querySelectorAll("#checklist-container input");
  const completed = [...checks].filter(check => check.checked).length;
  document.getElementById("progress").innerText = `${completed} / ${checks.length}`;
}

function updateCategories() {
  document.querySelectorAll(".category").forEach(category => {
    const checks = category.querySelectorAll("input");
    category.classList.toggle("completed", [...checks].every(check => check.checked));
  });
}

function checkAll() {
  const checks = document.querySelectorAll("#checklist-container input");
  const saved = {};

  checks.forEach(check => {
    check.checked = true;
    saved[check.dataset.item] = true;
  });

  localStorage.setItem(getStorageKey(), JSON.stringify(saved));
  updateProgress();
  updateCategories();
  clearWarning();
}

function resetAll() {
  document.querySelectorAll("#checklist-container input").forEach(check => {
    check.checked = false;
  });

  localStorage.removeItem(getStorageKey());
  updateProgress();
  updateCategories();
  clearWarning();
}

function finishChecklist() {
  const missed = [...document.querySelectorAll("#checklist-container input")]
    .filter(check => !check.checked)
    .map(check => check.dataset.item);

  if (missed.length) {
    showWarning(missed);
    return;
  }

  document.getElementById("success-text").innerHTML =
    `${checklists[currentFormat].title}<br><br>
    Ты всё собрал.<br>
    Ничего не забыл.`;

  showScreen("success-screen");
}

function showWarning(items) {
  const warning = document.getElementById("warning");

  warning.innerHTML =
    `⚠️ Ты что-то забыл:<br><br>${items.map(item => "• " + item).join("<br>")}`;

  warning.classList.remove("hide");
  setTimeout(() => warning.classList.add("show"), 10);

  setTimeout(() => {
    warning.classList.remove("show");
    warning.classList.add("hide");
  }, 5000);
}

function clearWarning() {
  const warning = document.getElementById("warning");
  warning.classList.remove("show");
  warning.classList.add("hide");
  warning.innerHTML = "";
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(console.error);
  });
}