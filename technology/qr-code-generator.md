---
layout: default
title: "QR Code Generator"
description: "QR Code Generator"
keywords: ""
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
            <input type="file" id="logoInput" accept="image/*" class="mt-3" />
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
        const logoInput = document.getElementById('logoInput').files[0];
        const logoUrl = logoInput ? URL.createObjectURL(logoInput) : null;
        // สร้าง QR Code
        const qrCode = new QRCode(container, {
            text: text,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        if (logoUrl) {
            // เมื่อ QR Code ถูกสร้างเสร็จแล้ว, แทรกโลโก้ลงกลาง
            const canvas = container.querySelector('canvas');
            const ctx = canvas.getContext('2d');
            const logoImage = new Image();
            logoImage.src = logoUrl;
            logoImage.onload = function() {
                const logoSize = canvas.width / 4; // ขนาดโลโก้
                const x = (canvas.width - logoSize) / 2;
                const y = (canvas.height - logoSize) / 2;
                // วาดโลโก้บน QR Code
                ctx.drawImage(logoImage, x, y, logoSize, logoSize);
            };
        }
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
        link.download = 'fintechxhub-qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>