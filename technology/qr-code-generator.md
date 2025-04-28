---
layout: default
title: "QR Code Generator"
description: "QR Code Generator"
keywords: ""
navTechnology: "active"
---
<div class="col-md-12 mb-2">technology</div>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>
<div class="col-md-6 offset-md-3">
    <div class="form-group m-2">
        <input type="text" id="text" autofocus placeholder="ใส่ข้อความที่นี่" class="form-control">
    </div>
</div>
<div class="col-md-12 text-center">
    <button class="btn btn-success btn-lg m-1" onclick="generateQRCode()">สร้าง QR Code</button>
    <button class="btn btn-primary btn-lg m-1" onclick="downloadQRCode()">ดาวน์โหลด QR Code</button>
    <center>
        <div id="qrcode" style="margin:20px;"></div>
    </center>
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
        const canvas = document.querySelector('#qrcode canvas');
        if (!canvas) {
            alert("กรุณาสร้าง QR Code ก่อนดาวน์โหลด");
            return;
        }
        const border = 10;
        const qrSize = canvas.width;
        const newSize = qrSize + border * 2;
        const borderedCanvas = document.createElement('canvas');
        borderedCanvas.width = newSize;
        borderedCanvas.height = newSize;
        const ctx = borderedCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, newSize, newSize);
        ctx.drawImage(canvas, border, border);
        const link = document.createElement('a');
        link.href = borderedCanvas.toDataURL('image/png');
        link.download = 'kris-p19-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>