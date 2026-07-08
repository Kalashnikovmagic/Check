let currentMode = "before";
let currentFormat = "micro";

const checklists = {
    micro: {
        title: "Микромагия",
        categories: [
            {
                name: "Одежда",
                items: [
                    "Рубашка / футболка",
                    "Пиджак",
                    "Брюки",
                    "Туфли",
                    "Носки",
                    "Браслеты и кольца"
                ]
            },
            {
                name: "Микрофон",
                items: [
                    "Зарядить батарейки",
                    "Передатчик",
                    "База",
                    "Головная гарнитура",
                    "Кабель XLR",
                    "Блок питания",
                    "Флешка"
                ]
            },
            {
                name: "Реквизит",
                items: [
                    "Чемодан",
                    "Штатив",
                    "Колоды обычные",
                    "Колоды Svengali",
                    "StandUp Monte",
                    "MentalDie",
                    "Симпсоны",
                    "Leviosa"
                ]
            }
        ]
    }
};


function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}


function openMode(mode) {
    currentMode = mode;

    document.getElementById("mode-title").innerText =
        mode === "before"
            ? "На выступление"
            : "После выступления";

    showScreen("format-screen");
}


function goHome() {
    showScreen("home-screen");
}


function openChecklist(format) {

    if (!checklists[format]) {
        alert("Этот формат пока в разработке");
        return;
    }

    currentFormat = format;

    document.getElementById("format-title").innerText =
        checklists[format].title;

    clearWarning();
    renderChecklist();

    showScreen("checklist-screen");
}


function getStorageKey() {
    return `magic_${currentMode}_${currentFormat}`;
}


function renderChecklist() {

    const container =
        document.getElementById("checklist-container");

    container.innerHTML = "";

    const saved =
        JSON.parse(localStorage.getItem(getStorageKey())) || {};


    checklists[currentFormat].categories.forEach((category, index) => {

        const block = document.createElement("div");
        block.className = "category";
        block.dataset.category = index;


        const title = document.createElement("div");
        title.className = "category-title";
        title.innerText = "▼ " + category.name;


        const items = document.createElement("div");
        items.className = "category-items";


        title.onclick = () => {
            items.style.display =
                items.style.display === "none"
                    ? "block"
                    : "none";
        };


        category.items.forEach(item => {

            const row = document.createElement("label");
            row.className = "item";

            row.innerHTML = `
                <input 
                    type="checkbox"
                    data-item="${item}"
                    data-category="${index}"
                    ${saved[item] ? "checked" : ""}
                >
                <span>${item}</span>
            `;

            items.appendChild(row);
        });


        block.appendChild(title);
        block.appendChild(items);

        container.appendChild(block);

    });


    updateProgress();
    updateCategories();
}



document.addEventListener("change", event => {

    if (event.target.matches("#checklist-container input")) {

        const saved =
            JSON.parse(localStorage.getItem(getStorageKey())) || {};


        saved[event.target.dataset.item] =
            event.target.checked;


        localStorage.setItem(
            getStorageKey(),
            JSON.stringify(saved)
        );


        updateProgress();
        updateCategories();
    }

});



function updateProgress() {

    const checks =
        document.querySelectorAll(
            "#checklist-container input"
        );


    let completed = 0;


    checks.forEach(check => {

        if (check.checked) {
            completed++;
        }

    });


    document.getElementById("progress").innerText =
        `${completed} / ${checks.length}`;
}



function updateCategories() {

    const categories =
        document.querySelectorAll(".category");


    categories.forEach(category => {

        const checks =
            category.querySelectorAll("input");


        let allChecked = true;


        checks.forEach(check => {

            if (!check.checked) {
                allChecked = false;
            }

        });


        if (allChecked) {
            category.classList.add("completed");
        } else {
            category.classList.remove("completed");
        }

    });

}





function checkAll() {

    const checks =
        document.querySelectorAll(
            "#checklist-container input"
        );


    const saved = {};


    checks.forEach(check => {

        check.checked = true;
        saved[check.dataset.item] = true;

    });


    localStorage.setItem(
        getStorageKey(),
        JSON.stringify(saved)
    );


    updateProgress();
    updateCategories();
    clearWarning();

}





function resetAll() {

    const checks =
        document.querySelectorAll(
            "#checklist-container input"
        );


    checks.forEach(check => {
        check.checked = false;
    });


    localStorage.removeItem(
        getStorageKey()
    );


    updateProgress();
    updateCategories();

}





function finishChecklist() {

    const checks =
        document.querySelectorAll(
            "#checklist-container input"
        );


    const missed = [];


    checks.forEach(check => {

        if (!check.checked) {
            missed.push(check.dataset.item);
        }

    });


    if (missed.length > 0) {

        showWarning(missed);
        return;

    }


    document.getElementById("success-text").innerHTML =
        `
        ${checklists[currentFormat].title}<br><br>
        Ты всё собрал.<br>
        Ничего не забыл.
        `;


    showScreen("success-screen");

}





function showWarning(items) {

    const warning =
        document.getElementById("warning");


    warning.style.display = "block";


    warning.innerHTML =
        `
        ⚠️ Ты что-то забыл:<br><br>
        ${items.map(item => "• " + item).join("<br>")}
        `;


    setTimeout(() => {

        warning.style.display = "none";
        warning.innerHTML = "";

    }, 5000);

}





function clearWarning() {

    const warning =
        document.getElementById("warning");


    warning.style.display = "none";
    warning.innerHTML = "";

}