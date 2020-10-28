'use strict';
let data = [
    {
        name: 'Dinar Khalfin',
        position: 'Graduate of HackerU high school',
        photo: './img/11.jpg',
        place: 'Russia 2019',
        text: 'I learned a scripting language that is used to give pages dynamics. JavaScript allows elements to respond to user actions. JavaScript also interacts with the backend.'
    },
    {
        name: 'Динар Халфин',
        position: 'Выпускник высшей школы HackerU',
        photo: './img/2.jpg',
        place: 'Россия 2020',
        text: 'На примере React (иногда React.js или ReactJS), что является JavaScript-библиотекой с открытым исходным кодом для разработки пользовательских интерфейсов, работал над проектом интернет-магазина: http://u90030.test-handyhost.ru/'
    },
    {
        name: 'Dinar Khalfin',
        position: 'Graduate of HackerU high school',
        photo: './img/3.png',
        place: 'Russia 2020',
        text: 'I learned how to use Spring MVC to create web applications.'
    },
    {
        name: 'Динар Халфин',
        position: 'Выпускник высшей школы HackerU',
        photo: './img/4.jpg',
        place: 'Россия 2020',
        text: 'Усовершенствовал свои знания в области языка PHP, интенсивно применяемого для разработки веб-приложений. Можно посмотреть результат работы по адресу: http://yand.dyndns.org:9999/dk '
    },
    {
        name: 'Dinar Khalfin',
        position: 'Graduate of HackerU high school',
        photo: './img/5.jpg',
        place: 'Russia 2020',
        text: 'I worked closely with SQL and solved tasks on the resource https://www.sql-ex.ru/ together with the teacher.'
    },
    {
        name: 'Динар Халфин',
        position: 'Выпускник высшей школы HackerU',
        photo: './img/6.jpg',
        place: 'Россия 2020',
        text: 'Изучал как предотвращать межсайтовый сриптинг и SQL-инъекции и т.д. c Александром Солодченко, чтобы знать как нужно обезопасить свое веб-приложение'
    }
];

let page = 0;

let rootElem = document.getElementById('root');
let galContainer = document.createElement('div');
let film = document.createElement('div');
let feedback = document.createElement('div');

galContainer.classList.add('galContainer');
film.classList.add('film');

feedback.classList.add('feedBacks');
feedback.innerText = 'Certificate of Achievement';
galContainer.appendChild(feedback);

//процесс добавления элементов
data.forEach(function (elem) {
    let cardElem = document.createElement('div');
    let nameElem = document.createElement('div');
    let textElem = document.createElement('div');
    let elemForImgClass = document.createElement('div');
    let elemForH2 = document.createElement('h2');
    let posElem = document.createElement('p');
    let placeElem = document.createElement('p');
    let mainElem = document.createElement('p');

    cardElem.classList.add('card');
    nameElem.classList.add('name');
    textElem.classList.add('text');
    elemForImgClass.classList.add('img');
    elemForImgClass.style.backgroundImage = `url(${elem.photo})`;
    elemForH2.innerText = elem.name;
    posElem.innerText = elem.position;
    placeElem.innerText = elem.place;
    mainElem.innerText = elem.text;

    cardElem.appendChild(nameElem);
    cardElem.appendChild(textElem);
    nameElem.appendChild(elemForImgClass);
    nameElem.appendChild(elemForH2);
    nameElem.appendChild(posElem);
    textElem.appendChild(placeElem);
    textElem.appendChild(mainElem);

    film.appendChild(cardElem);
});

let rightBtn = document.createElement('div');
let leftBtn = document.createElement('div');

rightBtn.addEventListener('click', goRight);
leftBtn.addEventListener('click', goLeft);

rightBtn.classList.add('rightBtn');
leftBtn.classList.add('leftBtn');

rightBtn.innerText = '>';
leftBtn.innerText = '<';

galContainer.appendChild(rightBtn);
galContainer.appendChild(leftBtn);

galContainer.appendChild(film);
rootElem.appendChild(galContainer);

let pointContainer = document.createElement('div');
pointContainer.classList.add('pointContainer');

data.forEach(function () {
    let point = document.createElement('div');
    point.classList.add('point');
    point.addEventListener('click', function () {
        let points = [...document.querySelectorAll('.point')];
        page = points.indexOf(this);
        film.style.marginLeft = `-${page}00%`;
        ridActive(this);
        appendActive(this);
    });
    pointContainer.appendChild(point);
});
galContainer.appendChild(pointContainer);


function resize() {
    film.style.width = data.length * galContainer.offsetWidth + 'px'; //window.innerWidth
    document.querySelectorAll('.card')
        .forEach(elem => elem.style.width = galContainer.offsetWidth + 'px');
    document.querySelectorAll('.img').forEach(elem => {
        elem.style.width = document.querySelector('.name').offsetWidth + 'px';
        elem.style.height = document.querySelector('.name').offsetWidth + 'px';
    });
}
resize();

function goLeft() {
    if (page === 0) return
    page--;
    ridActive();
    enablePeakBySlideState();
    film.style.marginLeft = `-${page}00%`;
}

function goRight() {
    if (page === data.length - 1) return
    page++;
    ridActive();
    enablePeakBySlideState();
    film.style.marginLeft = `-${page}00%`;
}

function enablePeakBySlideState() {
    let arr = [...document.querySelectorAll('.point')];
    arr[page].classList.add('active');
}

function appendActive(elem) {
    elem.classList.add('active');
}

function ridActive() {
    let arr = [...document.querySelectorAll('.point')];
    arr.forEach((elem)=>{elem.classList.remove('active')});   
}

enablePeakBySlideState();
window.addEventListener('resize', resize); //событие, обработчик