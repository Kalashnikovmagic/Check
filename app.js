let currentMode = "before";
let currentFormat = "micro";


// Данные чеклиста

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



// Переходы между экранами

function showScreen(id){

    document.querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });


    document.getElementById(id)
        .classList.add("active");

}



// Выбор режима

function openMode(mode){

    currentMode = mode;

    document.getElementById("mode-title").innerText =
        mode === "before"
        ? "На выступление"
        : "После выступления";


    showScreen("format-screen");

}



// Домой

function goHome(){

    showScreen("home-screen");

}



// Открытие чеклиста

function openChecklist(format){

    currentFormat = format;


    if(!checklists[format]){

        alert("Этот формат пока в разработке");

        return;

    }


    document.getElementById("format-title").innerText =
        checklists[format].title;


    renderChecklist();


    showScreen("checklist-screen");

}



// Создание списка

function renderChecklist(){

    const container =
        document.getElementById("checklist-container");


    container.innerHTML = "";


    checklists[currentFormat]
        .categories
        .forEach((category,index)=>{


            const block = document.createElement("div");

            block.className = "category";


            const title =
                document.createElement("div");

            title.className = "category-title";

            title.innerText =
                "▼ " + category.name;


            const items =
                document.createElement("div");

            items.className = "category-items";


            category.items.forEach(item=>{


                const row =
                    document.createElement("label");


                row.className = "item";


                row.innerHTML = `

                <input type="checkbox">

                <span>${item}</span>

                `;


                items.appendChild(row);


            });


            title.onclick = ()=>{

                items.style.display =
                    items.style.display === "none"
                    ? "block"
                    : "none";

            };


            block.appendChild(title);

            block.appendChild(items);


            container.appendChild(block);


        });



    updateProgress();

}



// Подсчёт прогресса

function updateProgress(){

    const checks =
        document.querySelectorAll(
            '#checklist-container input[type="checkbox"]'
        );


    let done = 0;


    checks.forEach(check=>{

        if(check.checked){
            done++;
        }

    });


    document.getElementById("progress").innerText =
        `${done} / ${checks.length}`;

}



// Следим за галочками

document.addEventListener(
    "change",
    function(e){

        if(
            e.target.matches(
                '#checklist-container input[type="checkbox"]'
            )
        ){

            updateProgress();

        }

    }
);



// Старт

showScreen("home-screen");