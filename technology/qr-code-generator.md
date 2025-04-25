---
layout: default
title: "QR Code Generator"
description: "QR Code Generator"
navTechnology: "active"
---
<div class="col-md-12">technology</div>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>
<div class="col-md-12">
    <div class="text-center">
        <input type="text" id="text" placeholder="ใส่ข้อความที่นี่" class="form-control">
        <button class="btn btn-success btn-lg" onclick="generateQRCode()">สร้าง QR Code</button>
        <center>
            <div id="qrcode" style="margin:20px;"></div>
        </center>
    </div>
</div>
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