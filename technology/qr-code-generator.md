---
layout: default
title: "QR Code Generator"
description: "QR Code Generator"
navTechnology: "active"
---
<div class="col-md-12">technology</div>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>
<div class="col-md-6 offset-md-3">
    <div class="text-center">
        <input type="text" id="text" placeholder="ใส่ข้อความที่นี่" class="form-control input-lg m-3">
        <button class="btn btn-success btn-lg" onclick="generateQRCode()">สร้าง QR Code</button>
        <button class="btn btn-primary btn-lg" onclick="downloadQRCode()">ดาวน์โหลด QR Code</button>
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
    function downloadQRCode() {
        const img = document.querySelector('#qrcode img');
        if (!img) {
            alert("กรุณาสร้าง QR Code ก่อนดาวน์โหลด");
            return;
        }
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>