---
layout: default
title: "O'clock Digital Clock"
description: "O'clock Digital Clock"
keywords: "O'clock Digital Clock"
urlx: "https://fintechxhub.com/technology/time"
image: "https://cdn.pixabay.com/photo/2015/12/03/22/16/clock-1075801_1280.jpg"
navTechnology: "active"
---
<style>
    .clock {
        color: #00ffcc;
        font-size: 30px;
        font-family: 'Courier New', Courier, monospace;
        background: #222;
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 20px;
        box-shadow: 0 0 20px #00ffcc, 0 0 40px #00ffcc inset;
    }
</style>
<div class="col-md-6 offset-md-3">
    <div class="tags-widget widget-item">
        <div class="clock text-center">
            <span id="hours">00</span> :
            <span id="minutes">00</span> :
            <span id="seconds">00</span>
        </div>
    </div>
</div>
<script>
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    setInterval(updateClock, 1000);
    updateClock(); // เรียกทันทีเพื่อไม่ให้หน้าจอว่างตอนโหลด
</script>