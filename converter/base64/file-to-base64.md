---
layout: default
title: "File to Base64 Converter | แปลงไฟล์เป็น Base64 ออนไลน์ฟรี รวดเร็ว ปลอดภัย"
description: "แปลงไฟล์เป็น Base64 ออนไลน์ฟรี รองรับทุกนามสกุล jpg, png, pdf, zip, docx, mp3 และอื่น ๆ ข้อมูลไม่ถูกอัปโหลดขึ้นเซิร์ฟเวอร์ ปลอดภัย ใช้งานง่าย เพียงเลือกไฟล์แล้วแปลงทันที พร้อมตัวเลือกคัดลอกผลลัพธ์รวดเร็วบนเว็บเบราว์เซอร์."
keywords: "file to base64, convert file to base64, แปลงไฟล์เป็น base64, base64 converter, file converter, online converter, dataurl converter, encode file base64, base64 encode, base64 tool, convert file, แปลงไฟล์ออนไลน์, base64 ไทย, file base64 online"
---
<div class="container py-5">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <div class="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
        <h1 class="text-xl font-bold mb-4">File → Base64 Converter</h1>
        <!-- File Input -->
        <input id="fileInput" type="file"
        class="block w-full text-sm text-slate-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-xl file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100">
        <p id="fileInfo" class="text-xs text-slate-500 mt-1">ยังไม่ได้เลือกไฟล์</p>
        <!-- Option -->
        <div class="flex items-center gap-2 mt-4">
        <input id="chkDataUrl" type="checkbox" class="rounded border-slate-300 text-blue-600">
        <label for="chkDataUrl" class="text-sm select-none">
            รวม prefix (data:mime/type;base64,...)
        </label>
        </div>
        <!-- Convert -->
        <button id="btnFileToB64"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
        แปลงไฟล์เป็น Base64
        </button>
        <span id="fileMsg" class="text-xs text-green-600 ml-2"></span>
        <!-- Output -->
        <textarea id="fileBase64Output"
        class="w-full min-h-[200px] mt-4 p-3 rounded-xl border text-sm font-mono bg-slate-50"
        placeholder="Base64 output..." readonly></textarea>
        <!-- Copy Btn -->
        <button id="btnCopyFileB64"
        class="mt-3 px-4 py-2 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-900">
        คัดลอกผลลัพธ์
        </button>
    </div>
    <!-- JS SINGLE LINE -->
    <script>
    let selectedFile=null;$("#fileInput").on("change",function(e){const f=e.target.files[0];selectedFile=f||null;$("#fileMsg").text("");$("#fileBase64Output").val("");if(!f){$("#fileInfo").text("ยังไม่ได้เลือกไฟล์");return;}const s=(f.size/1024).toFixed(1);$("#fileInfo").text(`เลือกไฟล์แล้ว: ${f.name} (${s} KB, type: ${f.type||"ไม่ระบุ"})`);});$("#btnFileToB64").on("click",function(){$("#fileMsg").text("");if(!selectedFile){$("#fileMsg").text("กรุณาเลือกไฟล์ก่อน");return;}const r=new FileReader();r.onload=function(e){const d=e.target.result,p=String(d).split(",");if(p.length<2){$("#fileBase64Output").val("");$("#fileMsg").text("รูปแบบข้อมูลไฟล์ไม่ถูกต้อง");return;}const b64=p[1],out=$("#chkDataUrl").is(":checked")?d:b64;$("#fileBase64Output").val(out);$("#fileMsg").text("แปลงไฟล์สำเร็จ");};r.onerror=function(){$("#fileMsg").text("เกิดข้อผิดพลาดในการอ่านไฟล์");};r.readAsDataURL(selectedFile);});$("#btnCopyFileB64").on("click",async function(){const v=$("#fileBase64Output").val();if(!v)return;try{await navigator.clipboard.writeText(v);$("#fileMsg").text("คัดลอกผลลัพธ์แล้ว");setTimeout(()=>$("#fileMsg").text(""),2000);}catch(e){$("#fileMsg").text("ไม่สามารถคัดลอกได้");}});
    </script>
</div>