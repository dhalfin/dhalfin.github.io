"use strict";

let flickElement = document.querySelector('.btn');
let limitDate = document.getElementById('deadline_date');
let issue = document.getElementById('deadline_description');
let dateElement = document.querySelector('.date');
let id;

const options = {weekday : 'long', month:'short', day:'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', options);

try{
    id = +localStorage.getItem('id');
}catch (e) {
    localStorage.setItem('id', '');
    id = +localStorage.getItem('id');
}

flickElement.addEventListener('click', ()=> {
    console.log(id);
    let isOperational = flickElement.classList.value.includes('active');
    if (isOperational) {
        let dateValue = limitDate.value;
        let taskValue = issue.value;
        let map = {
            'id': id, 'Deadline_date': dateValue, 'Deadline_description': taskValue,
            'time_to_the_end': (Date.parse(dateValue) - Date.now()), 'color': {'r': 0, 'g': 255, 'b': 0}
        };
        localStorage.setItem(String(id), JSON.stringify(map));
        render(map);
        setTimeout(() => {
                limitDate.value = '';
                issue.value = '';
            },
            2000)
    } else {
        console.log('empty inputs')
    }
    localStorage.setItem('id', String(id += 1));
});

addEventListener('input', ()=>{
    let dateValue = limitDate.value;
    let taskValue = issue.value;
    if (dateValue != '' & taskValue != ''){
        flickElement.classList.add('active');
    }else {
        flickElement.classList.remove('active');
    }
});

function render(arr) {
    let postRoot = document.querySelector('#root');
    let divElem = document.createElement('div');
    let closeBtn = document.createElement('div');
    closeBtn.addEventListener('click', function(){remove(this)});
    divElem.classList.add('postFrame');
    divElem.id = arr['id'];
    closeBtn.classList.add('close_btn');
    for (let key in arr){
        if (key === 'color' || key === 'id'){
            continue
        }
        let elem = document.createElement('p');
        elem.innerHTML = `<b>${key}</b> : ${arr[key]}`;
        elem.classList.add(key);
        divElem.appendChild(elem);
    }
    divElem.appendChild(closeBtn);
    postRoot.appendChild(divElem);
}

function provideOnTheLaunch() {
    let keys = Object.keys(localStorage);
    console.log(keys);
    for (let key in keys){
        if (keys[key] === 'id'){
            continue;
        }
        console.log(keys[key]);
        let json = JSON.parse(localStorage.getItem(String(keys[key])));
        render(json);
    }
}

function transform( msecs ) {
    let day, hour, minute, seconds;
    seconds = Math.floor(msecs / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}

function provideAnew() {
    let allPosts = [...document.querySelectorAll('.postFrame')];
    allPosts.forEach((item)=>{
        let renderElem = document.getElementById(item.id);
        let json = JSON.parse(localStorage.getItem(String(item.id)));
        let msecs = Date.parse(json['Deadline_date']) - Date.now();
        if (msecs <= (1*24*60*60*1000)){
            configureColor(msecs, json);
        }
        let r = JSON.parse(localStorage.getItem(String(item.id)))['color']['r'];
        let g = JSON.parse(localStorage.getItem(String(item.id)))['color']['g'];
        let b = JSON.parse(localStorage.getItem(String(item.id)))['color']['b'];
        renderElem.style.backgroundColor = `rgb(${r},${g},${b})`;
        let timeObj = transform(msecs);
        item.children[2].innerHTML = `<b>Remaining_time</b> : ${timeObj.day}d ${timeObj.hour}h ${timeObj.minute}m ${timeObj.seconds}s`;
    })
}

function configureColor(msecs, arr) {
    let colorCharacteristic = Math.round(msecs/169412);
    if  (colorCharacteristic > 255){
        arr['color']['r'] = colorCharacteristic - 255;
        arr['color']['g'] = 255;
    } else if (colorCharacteristic <= 255) {
        arr['color']['r'] = 255;
        arr['color']['g'] = colorCharacteristic;
    }
    localStorage.setItem( String(arr['id']), JSON.stringify(arr));
}

function remove(obj) {
    let id = obj.parentElement.id;
    obj.parentElement.remove();
    localStorage.removeItem(id);
}

provideOnTheLaunch();
provideAnew();
setInterval(()=>{provideAnew()}, 1000);