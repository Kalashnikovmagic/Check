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








// --------------------------
// Навигация
// --------------------------



function showScreen(id) {


    document
    .querySelectorAll(".screen")
    .forEach(screen => {

        screen.classList.remove("active");

    });



    document
    .getElementById(id)
    .classList.add("active");


}






function openMode(mode) {


    currentMode = mode;



    document
    .getElementById("mode-title")
    .innerText =

        mode === "before"

        ? "На выступление"

        : "После выступления";



    showScreen("format-screen");


}






function goHome() {


    showScreen("home-screen");


}









// --------------------------
// Чеклист
// --------------------------



function openChecklist(format) {



    if (!checklists[format]) {


        alert(
            "Этот формат пока в разработке"
        );


        return;

    }



    currentFormat = format;



    document
    .getElementById("format-title")
    .innerText =
        checklists[format].title;



    renderChecklist();



    showScreen("checklist-screen");

}








function getStorageKey() {


    return (

        "magic_" +

        currentMode +

        "_" +

        currentFormat

    );


}








function renderChecklist() {



    const container =

        document
        .getElementById(
            "checklist-container"
        );



    container.innerHTML = "";



    const saved =

        JSON.parse(

            localStorage.getItem(
                getStorageKey()
            )

        ) || {};






    checklists[currentFormat]
    .categories
    .forEach(category => {



        const block =
            document.createElement(
                "div"
            );


        block.className =
            "category";





        const title =
            document.createElement(
                "div"
            );


        title.className =
            "category-title";



        title.innerText =
            "▼ " + category.name;






        const items =
            document.createElement(
                "div"
            );


        items.className =
            "category-items";







        category.items
        .forEach(item => {



            const row =
                document.createElement(
                    "label"
                );



            row.className =
                "item";



            row.innerHTML = `


                <input

                    type="checkbox"

                    data-item="${item}"

                    ${saved[item] ? "checked" : ""}

                >


                <span>${item}</span>


            `;



            items.appendChild(row);



        });






        title.onclick = () => {


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









// --------------------------
// Сохранение галочек
// --------------------------



document
.addEventListener(
"change",
event => {



    if (

        event.target.matches(

        '#checklist-container input[type="checkbox"]'

        )

    ) {



        const saved =

            JSON.parse(

                localStorage.getItem(
                    getStorageKey()
                )

            ) || {};





        saved[event.target.dataset.item] =

            event.target.checked;





        localStorage.setItem(

            getStorageKey(),

            JSON.stringify(saved)

        );





        updateProgress();


    }


}

);









// --------------------------
// Прогресс
// --------------------------



function updateProgress() {



    const checks =

        document
        .querySelectorAll(

        '#checklist-container input[type="checkbox"]'

        );



    let done = 0;



    checks.forEach(check => {



        if(check.checked){

            done++;

        }


    });




    document
    .getElementById("progress")
    .innerText =


        `${done} / ${checks.length}`;



}









// --------------------------
// Кнопка ГОТОВО
// --------------------------



document
.getElementById("finish-button")
.addEventListener(
"click",
finishChecklist
);






function finishChecklist() {



    const checks =

        document
        .querySelectorAll(

        '#checklist-container input[type="checkbox"]'

        );



    let missed = [];



    checks.forEach(check => {



        if(!check.checked) {


            missed.push(
                check.dataset.item
            );


        }


    });





    if(missed.length > 0) {



        showWarning(missed);



    }

    else {



        showScreen(
            "success-screen"
        );


    }


}








function showWarning(items) {



    const old =

        document
        .getElementById(
            "warning"
        );



    if(old){

        old.remove();

    }





    const warning =

        document
        .createElement(
            "div"
        );



    warning.id =
        "warning";





    warning.innerHTML = `


        ⚠️ Ты что-то забыл:


        <br><br>


        ${

            items
            .map(
                item =>
                "• " + item
            )
            .join("<br>")

        }


    `;





    document
    .body
    .appendChild(warning);





    setTimeout(() => {


        warning.remove();


    },5000);



}









// Старт

showScreen("home-screen");