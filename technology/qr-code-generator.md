---
layout: default
title: "QR Code Generator"
description: "QR Code Generator"
keywords: "QR Code Generator"
urlx: "https://fintechxhub.com/technology/qr-code-generator"
image: "https://cdn.pixabay.com/photo/2020/07/18/13/53/alipay-5417264_1280.jpg"
navTechnology: "active"
---
<script src="https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js"></script>
<div class="col-md-6 offset-md-3">
    <div class="search-widget widget-item">
        <h3 class="widget-title">Generate Your Qr Code</h3>
        <form action="">
            <input type="text" id="text" autofocus placeholder="Enter your url or text.">
        </form>
        <div class="text-center">
            <button class="btn btn-success btn-lg m-1 mt-3" onclick="generateQRCode()">สร้าง QR Code</button>
            <button class="btn btn-primary btn-lg m-1 mt-3" onclick="downloadQRCode()">ดาวน์โหลด QR Code</button>
        </div>
    </div>
</div>
<div class="col-md-6 offset-md-3">
    <div class="tags-widget widget-item">
        <h3 class="widget-title">Result:</h3>
        <div id="qrcode" style="margin:20px;"></div>
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
        link.download = 'fintechxhub-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>