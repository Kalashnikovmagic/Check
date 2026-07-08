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



// ----------------------------
// Экраны
// ----------------------------


function showScreen(id){

    document.querySelectorAll(".screen")
    .forEach(screen=>{
        screen.classList.remove("active");
    });


    document.getElementById(id)
    .classList.add("active");

}



function openMode(mode){

    currentMode = mode;


    document.getElementById("mode-title").innerText =
        mode === "before"
        ? "На выступление"
        : "После выступления";


    showScreen("format-screen");

}



function goHome(){

    showScreen("home-screen");

}




// ----------------------------
// Чеклист
// ----------------------------


function openChecklist(format){

    if(!checklists[format]){

        alert("Этот формат пока в разработке");

        return;

    }


    currentFormat = format;


    document.getElementById("format-title").innerText =
        checklists[format].title;


    renderChecklist();


    showScreen("checklist-screen");

}




function getStorageKey(){

    return `magic_${currentMode}_${currentFormat}`;

}




function renderChecklist(){

    const container =
        document.getElementById("checklist-container");


    container.innerHTML = "";


    const saved =
        JSON.parse(
            localStorage.getItem(getStorageKey())
        ) || {};



    checklists[currentFormat]
    .categories
    .forEach((category)=>{


        const block =
            document.createElement("div");

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


            const checked =
                saved[item] ? "checked" : "";



            row.innerHTML = `

                <input 
                    type="checkbox"
                    ${checked}
                    data-item="${item}"
                >

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



// ----------------------------
// Сохранение
// ----------------------------


document.addEventListener(
"change",
function(e){


    if(
        e.target.matches(
        '#checklist-container input[type="checkbox"]'
        )
    ){


        const saved =
            JSON.parse(
                localStorage.getItem(getStorageKey())
            ) || {};



        saved[e.target.dataset.item] =
            e.target.checked;



        localStorage.setItem(
            getStorageKey(),
            JSON.stringify(saved)
        );



        updateProgress();

    }

});





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



    document.getElementById("progress")
    .innerText =
    `${done} / ${checks.length}`;

}




// ----------------------------
// Старт
// ----------------------------


showScreen("home-screen");