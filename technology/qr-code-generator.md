---
layout: default
title: "QR Code Generator"
description: "QR Code Generator"
navTechnology: "active"
---
technology

<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>
<input type="text" id="text" placeholder="ใส่ข้อความที่นี่">
<button onclick="generateQRCode()">สร้าง QR Code</button>

<div id="qrcode" style="margin-top: 20px;"></div>

<script>
    function generateQRCode() {
        const container = document.getElementById('qrcode');
        container.innerHTML = ''; // ล้างของเก่า
        const text = document.getElementById('text').value;
        new QRCode(container, {
            text: text,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
</script>