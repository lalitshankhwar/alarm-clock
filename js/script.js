let alarmTime , isAlarmSet;
const ringing = new Audio('alarm.mp3');
let hourElement = document.getElementById('hours')
let minElement = document.getElementById('mins')
let ampmElement = document.getElementById('ampm')
let setAlarmbtn = document.getElementById('setAlarmbtn')
let realtime = document.getElementById('realtime')
let alarmInput = document.querySelector('.alarm-input')

for (let i = 1; i <= 12; i++) {
    i = i < 10 ?'0'+ i: i;
    hourElement.innerHTML += `<option value="${i}">${i}</option>`
}
for (let i = 0; i <= 60; i++) {
    i = i < 10 ?'0'+ i: i;
    minElement.innerHTML += `<option value="${i}">${i}</option>`
}

setInterval(function () {
    let d = new Date();
    let h = d.getHours();
    ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    h = h < 10 ? '0' + h : h;
    let m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    let s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    realtime.innerHTML =`${h}:${m}:${s} ${ampm}`;
    if (alarmTime === `${h}:${m} ${ampm}`) {
        // console.log("alarm");
        ringing.play();
        ringing.loop = true
    }

}, 1000);

function alarm(){
    if(isAlarmSet){
        alarmTime = '';
        alarmInput.classList.remove('disable');
        ringing.pause();
        setAlarmbtn.innerHTML = 'Set Alarm';
        setAlarmbtn.style.backgroundColor = '#0d2957';
        return isAlarmSet = false;
    }
    let time = `${hourElement.value}:${minElement.value} ${ampmElement.value}`;
    // console.log(time);
    if(time.includes("Hours") || time.includes("Minutes") || time.includes("AM/PM")){
       return alert("Please set a valid time for Alarm")
    }
    alarmTime = time;
    isAlarmSet = true; 
    alarmInput.classList.add('disable');
    setAlarmbtn.innerHTML = 'Clear Alarm';
    setAlarmbtn.style.backgroundColor = '#c62828';
}

setAlarmbtn.addEventListener('click', alarm);
