---
layout: default
title: "Base64 to File Converter | แปลง Base64 เป็นไฟล์ ดาวน์โหลดได้ทันที (ออนไลน์ฟรี)"
description: "แปลง Base64 เป็นไฟล์ออนไลน์ฟรี เพียงวาง Base64 แล้วดาวน์โหลดไฟล์ได้ทันที รองรับไฟล์ภาพ เอกสาร ข้อความ PDF JPG PNG ZIP MP3 และอื่น ๆ ทำงานบนเบราว์เซอร์ ปลอดภัย ไม่อัปโหลดข้อมูลขึ้นเซิร์ฟเวอร์ ใช้งานง่ายและรวดเร็ว."
keywords: "base64 to file, convert base64 to file, แปลง base64 เป็นไฟล์, decode base64, base64 decoder, base64 download file, online base64 converter, base64 tool, extract base64, base64 ไทย, convert base64, dataurl to file, base64 decode online"
---
<div class="container py-5">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <div class="max-w-3xl mx-auto mt-10 bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h1 class="text-2xl font-bold mb-2">Base64 → File Converter</h1>
        <p class="text-sm text-slate-500 mb-6">
        วาง Base64 หรือข้อมูลแบบ <code>data:mime/type;base64,...</code> แล้วแปลงเป็นไฟล์ให้ดาวน์โหลดได้ทันที (ทำงานบนเบราว์เซอร์ 100%)
        </p>
        <!-- Input Base64 -->
        <div class="mb-4">
        <label for="base64Input" class="block text-sm font-semibold mb-1">Base64 / Data URL Input</label>
        <textarea id="base64Input"
            class="w-full min-h-[220px] rounded-xl border border-slate-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="วาง Base64 ที่นี่ เช่น&#10;VGhpcyBpcyBhIHRlc3Q=&#10;&#10;หรือแบบ Data URL เช่น&#10;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA..."></textarea>
        </div>
        <!-- File name & mime -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
            <label for="fileName" class="block text-sm font-semibold mb-1">ชื่อไฟล์ที่ต้องการดาวน์โหลด</label>
            <input id="fileName" type="text"
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="เช่น output.bin หรือ image.png" />
        </div>
        <div>
            <label for="mimeType" class="block text-sm font-semibold mb-1">MIME type (ถ้าไม่ได้อยู่ใน Data URL)</label>
            <input id="mimeType" type="text"
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="เช่น application/octet-stream หรือ image/png (ไม่บังคับ)" />
        </div>
        </div>
        <!-- Button + message -->
        <div class="flex flex-wrap items-center gap-3 mb-4">
        <button id="btnB64ToFile"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl">
            แปลง Base64 เป็นไฟล์ และดาวน์โหลด
        </button>
        <span id="b64Msg" class="text-xs text-green-600"></span>
        </div>
        <p class="text-xs text-slate-500">
        * หากเป็นรูปแบบ <code>data:&lt;mime&gt;;base64,&lt;data&gt;</code> ระบบจะดึง MIME type ให้เองโดยอัตโนมัติ<br>
        * หากเป็น Base64 ล้วน ๆ ให้ระบุ MIME type เอง หรือปล่อยว่างเพื่อใช้ค่าเริ่มต้น <code>application/octet-stream</code>
        </p>
    </div>
    <!-- JavaScript (single line) -->
    <script>
    $(function(){$("#btnB64ToFile").on("click",function(){$("#b64Msg").text("");let raw=$("#base64Input").val().trim();if(!raw){$("#b64Msg").text("กรุณาวางข้อมูล Base64 ก่อน");return;}let mimeInput=$("#mimeType").val().trim();let fileName=$("#fileName").val().trim()||"download.bin";let base64="",mime="";if(raw.startsWith("data:")){let commaIndex=raw.indexOf(",");if(commaIndex===-1){$("#b64Msg").text("รูปแบบ Data URL ไม่ถูกต้อง (ไม่มีเครื่องหมาย ,)");return;}let header=raw.substring(5,commaIndex);let parts=header.split(";");mime=parts[0]||"";base64=raw.substring(commaIndex+1);}else{base64=raw;}base64=base64.replace(/\s+/g,"");if(!mime){mime=mimeInput||"application/octet-stream";}try{let binary=atob(base64);let len=binary.length;let bytes=new Uint8Array(len);for(let i=0;i<len;i++){bytes[i]=binary.charCodeAt(i);}let blob=new Blob([bytes],{type:mime});let url=URL.createObjectURL(blob);let a=document.createElement("a");a.href=url;a.download=fileName;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},2000);$("#b64Msg").text("สร้างไฟล์สำหรับดาวน์โหลดแล้ว");}catch(e){console.error(e);$("#b64Msg").text("ไม่สามารถแปลง Base64 เป็นไฟล์ได้ กรุณาตรวจสอบรูปแบบข้อมูลอีกครั้ง");}});});
    </script>
</div>