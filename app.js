let currentMode="before";
let currentFormat="micro";

const checklists={

micro:{
title:"Микромагия",
categories:[
{
name:"👔 Одежда",
items:[
"Рубашка / футболка",
"Пиджак",
"Брюки",
"Туфли",
"Носки",
"Браслеты и кольца"
]
},
{
name:"🎤 Микрофон",
items:[
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
name:"🎩 Микромагия",
items:[
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
},


scene:{
title:"Сцена",
categories:[
{
name:"👔 Одежда",
items:[
"Рубашка / футболка",
"Пиджак",
"Брюки",
"Туфли",
"Носки",
"Браслеты и кольца"
]
},
{
name:"🎤 Микрофон",
items:[
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
name:"🎲 VenomCube",
items:[
"Кубики",
"Пакет"
]
},
{
name:"📑 Престиж",
items:[
"Престиж"
]
},
{
name:"📱 iPhone",
items:[
"Коробка",
"Пакет",
"Муляж",
"Платок",
"Болгарка"
]
},
{
name:"📕 Буктест",
items:[
"Книги"
]
},
{
name:"🎆 Салют",
items:[
"Салют",
"Зажигалка"
]
}
]
},


scenePlus:{
title:"Сцена+",
categories:[
{
name:"👔 Одежда",
items:[
"Рубашка / футболка",
"Пиджак",
"Брюки",
"Туфли",
"Носки",
"Браслеты и кольца"
]
},
{
name:"🎤 Микрофон",
items:[
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
name:"🧨 Динамит",
items:[
"Шашка",
"Лента",
"Очки",
"Скотч",
"Карты",
"Фитиль"
]
},
{
name:"📑 Престиж",
items:[
"Престиж"
]
},
{
name:"📱 iPhone",
items:[
"Коробка",
"Пакет",
"Муляж",
"Платок",
"Болгарка"
]
},
{
name:"📕 Буктест",
items:[
"Книги"
]
},
{
name:"🛠️ Степлеры",
items:[
"Мешок",
"Степлеры",
"Скобы",
"Доска",
"Карты"
]
},
{
name:"🎲 VenomCube",
items:[
"Кубики",
"Пакет"
]
},
{
name:"🎆 Салют",
items:[
"Салют",
"Зажигалка"
]
}
]
},


scenePlusMicro:{
title:"Сцена+микро",
categories:[
{
name:"👔 Одежда",
items:[
"Рубашка / футболка",
"Пиджак",
"Брюки",
"Туфли",
"Носки",
"Браслеты и кольца"
]
},
{
name:"🎤 Микрофон",
items:[
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
name:"🎩 Микромагия",
items:[
"Чемодан",
"Штатив",
"Колоды обычные",
"Колоды Svengali",
"StandUp Monte",
"MentalDie",
"Симпсоны",
"Leviosa"
]
},
{
name:"🎲 VenomCube",
items:[
"Кубики",
"Пакет"
]
},
{
name:"🧨 Динамит",
items:[
"Шашка",
"Лента",
"Очки",
"Скотч",
"Карты",
"Фитиль"
]
},
{
name:"📑 Престиж",
items:[
"Престиж"
]
},
{
name:"📱 iPhone",
items:[
"Коробка",
"Пакет",
"Муляж",
"Платок",
"Болгарка"
]
},
{
name:"📕 Буктест",
items:[
"Книги"
]
},
{
name:"🛠️ Степлеры",
items:[
"Мешок",
"Степлеры",
"Скобы",
"Доска",
"Карты"
]
},
{
name:"🎆 Салют",
items:[
"Салют",
"Зажигалка"
]
}
]
}

};


function showScreen(id){

document.querySelectorAll(".screen").forEach(screen=>{
screen.classList.remove("active");
});

document.getElementById(id).classList.add("active");

}



function openMode(mode){

currentMode=mode;

document.getElementById("mode-title").innerText=
mode==="before"?"На выступление":"После выступления";

showScreen("format-screen");

}



function goHome(){

showScreen("home-screen");

}



function openChecklist(format){

currentFormat=format;

document.getElementById("format-title").innerText=
checklists[format].title;

clearWarning();

renderChecklist();

showScreen("checklist-screen");

}



function getStorageKey(){

return `magic_${currentMode}_${currentFormat}`;

}



function renderChecklist(){

const container=document.getElementById("checklist-container");

container.innerHTML="";

const saved=
JSON.parse(localStorage.getItem(getStorageKey()))||{};



checklists[currentFormat].categories.forEach(category=>{


const block=document.createElement("div");

block.className="category";


const title=document.createElement("div");

title.className="category-title";

title.innerText="▼ "+category.name;



const items=document.createElement("div");

items.className="category-items";



title.onclick=()=>{

items.style.display=
items.style.display==="none"?"block":"none";

};



category.items.forEach(item=>{


const row=document.createElement("label");

row.className="item";


row.innerHTML=`

<input type="checkbox" data-item="${item}" ${saved[item]?"checked":""}>

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



document.addEventListener("change",event=>{


if(event.target.matches("#checklist-container input")){


const saved=
JSON.parse(localStorage.getItem(getStorageKey()))||{};


saved[event.target.dataset.item]=event.target.checked;


localStorage.setItem(
getStorageKey(),
JSON.stringify(saved)
);



updateProgress();

updateCategories();


}


});



function updateProgress(){

const checks=
document.querySelectorAll("#checklist-container input");


let completed=0;


checks.forEach(check=>{

if(check.checked) completed++;

});


document.getElementById("progress").innerText=
`${completed} / ${checks.length}`;

}



function updateCategories(){


document.querySelectorAll(".category").forEach(category=>{


const checks=
category.querySelectorAll("input");


let complete=true;


checks.forEach(check=>{

if(!check.checked)
complete=false;

});


category.classList.toggle(
"completed",
complete
);


});


}



function checkAll(){

const checks=
document.querySelectorAll("#checklist-container input");


const saved={};


checks.forEach(check=>{

check.checked=true;

saved[check.dataset.item]=true;

});


localStorage.setItem(
getStorageKey(),
JSON.stringify(saved)
);


updateProgress();

updateCategories();

clearWarning();

}



function resetAll(){

document.querySelectorAll("#checklist-container input")
.forEach(check=>{

check.checked=false;

});


localStorage.removeItem(getStorageKey());


updateProgress();

updateCategories();

}



function finishChecklist(){


const missed=[];


document.querySelectorAll("#checklist-container input")
.forEach(check=>{


if(!check.checked)
missed.push(check.dataset.item);


});


if(missed.length){

showWarning(missed);

return;

}



document.getElementById("success-text").innerHTML=

`${checklists[currentFormat].title}<br><br>
Ты всё собрал.<br>
Ничего не забыл.`;



showScreen("success-screen");


}



function showWarning(items){


const warning=document.getElementById("warning");


warning.innerHTML=

`
⚠️ Ты что-то забыл:<br><br>
${items.map(item=>"• "+item).join("<br>")}
`;



warning.classList.remove("hide");



setTimeout(()=>{

warning.classList.add("show");

},10);



setTimeout(()=>{

warning.classList.remove("show");

warning.classList.add("hide");

},5000);



}



function clearWarning(){

const warning=document.getElementById("warning");

warning.classList.remove("show");

warning.classList.add("hide");

warning.innerHTML="";

}