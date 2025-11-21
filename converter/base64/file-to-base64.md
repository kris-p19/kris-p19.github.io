---
layout: default
title: "Text / Base64 Converter"
description: "ศูนย์กลางข้อมูลและความรู้ด้านฟินเทคที่ทันสมัย"
keywords: ""
navAbout: "active"
---
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<div class="min-h-screen bg-slate-100 text-slate-800">
    <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white shadow-lg rounded-2xl p-6 md:p-8">
            <h1 class="text-2xl md:text-3xl font-bold mb-2">
                Text / Base64 Converter
            </h1>
            <p class="text-sm text-slate-500 mb-6">
                เครื่องมือแปลงข้อความเป็น Base64 (ทุกอย่างทำงานบนเบราว์เซอร์ ไม่อัปโหลดขึ้นเซิร์ฟเวอร์)
            </p>
            <!-- Tabs -->
            <div class="flex gap-2 mb-6">
                <button id="tab-text"
                        class="tab-btn px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white">
                Text → Base64
                </button>
            </div>
            <!-- Text → Base64 panel -->
            <div id="panel-text" class="space-y-4">
                <div>
                    <label for="textInput" class="block text-sm font-semibold mb-1">
                        ข้อความ (Text Input)
                    </label>
                    <textarea id="textInput" class="w-full min-h-[160px] rounded-xl border border-slate-200 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="พิมพ์หรือวางข้อความที่ต้องการแปลงเป็น Base64..."></textarea>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <button id="btnTextToB64"
                            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl">
                        แปลงเป็น Base64
                    </button>
                    <button id="btnCopyTextB64"
                            class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-xl">
                        คัดลอกผลลัพธ์
                    </button>
                    <span id="textMsg" class="text-xs text-green-600"></span>
                </div>
                <div>
                    <label for="textBase64Output" class="block text-sm font-semibold mb-1">
                        Base64 Output
                    </label>
                    <textarea id="textBase64Output" class="w-full min-h-[160px] rounded-xl border border-slate-200 px-3 py-2 text-sm font-mono bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="ผลลัพธ์ Base64 จะแสดงที่นี่..." readonly></textarea>
                </div>
                <p class="text-xs text-slate-500">
                * ใช้การเข้ารหัสแบบ UTF-8 รองรับภาษาไทยและ Unicode
                </p>
            </div>
        </div>
    </div>
    <script>
        function textToBase64(str){return btoa(unescape(encodeURIComponent(str)));}$(function(){const $tabText=$("#tab-text");const $tabFile=$("#tab-file");const $panelText=$("#panel-text");const $panelFile=$("#panel-file");function activateTab(tab){if(tab==="text"){$tabText.addClass("bg-blue-600 text-white").removeClass("bg-slate-100 text-slate-800");$tabFile.addClass("bg-slate-100 text-slate-800").removeClass("bg-blue-600 text-white");$panelText.removeClass("hidden");$panelFile.addClass("hidden");}else{$tabFile.addClass("bg-blue-600 text-white").removeClass("bg-slate-100 text-slate-800");$tabText.addClass("bg-slate-100 text-slate-800").removeClass("bg-blue-600 text-white");$panelFile.removeClass("hidden");$panelText.addClass("hidden");}}$tabText.on("click",function(){activateTab("text");});$tabFile.on("click",function(){activateTab("file");});$("#btnTextToB64").on("click",function(){$("#textMsg").text("");const input=$("#textInput").val()||"";try{const b64=textToBase64(input);$("#textBase64Output").val(b64);}catch(e){console.error(e);$("#textBase64Output").val("");$("#textMsg").text("เกิดข้อผิดพลาดในการแปลงข้อความเป็น Base64");}});$("#btnCopyTextB64").on("click",async function(){const val=$("#textBase64Output").val();if(!val)return;try{await navigator.clipboard.writeText(val);$("#textMsg").text("คัดลอกผลลัพธ์แล้ว");setTimeout(()=>$("#textMsg").text(""),2000);}catch(e){console.error(e);$("#textMsg").text("เบราว์เซอร์ไม่อนุญาตให้คัดลอกอัตโนมัติ");}});let selectedFile=null;$("#fileInput").on("change",function(e){const file=e.target.files[0];selectedFile=file||null;$("#fileMsg").text("");$("#fileBase64Output").val("");if(!file){$("#fileInfo").text("ยังไม่ได้เลือกไฟล์");return;}const sizeKb=(file.size/1024).toFixed(1);$("#fileInfo").text(`เลือกไฟล์แล้ว: ${file.name} (${sizeKb} KB, type: ${file.type||"ไม่ระบุ"})`);});$("#btnFileToB64").on("click",function(){$("#fileMsg").text("");if(!selectedFile){$("#fileMsg").text("กรุณาเลือกไฟล์ก่อน");return;}const reader=new FileReader();reader.onload=function(e){const dataUrl=e.target.result;const parts=String(dataUrl).split(",");if(parts.length<2){$("#fileBase64Output").val("");$("#fileMsg").text("รูปแบบข้อมูลไฟล์ไม่ถูกต้อง");return;}const prefix=parts[0];const base64=parts[1];const includeDataUrl=$("#chkDataUrl").is(":checked");const output=includeDataUrl?dataUrl:base64;$("#fileBase64Output").val(output);$("#fileMsg").text("แปลงไฟล์เป็น Base64 สำเร็จ");};reader.onerror=function(e){console.error(e);$("#fileMsg").text("เกิดข้อผิดพลาดในการอ่านไฟล์");};reader.readAsDataURL(selectedFile);});$("#btnCopyFileB64").on("click",async function(){const val=$("#fileBase64Output").val();if(!val)return;try{await navigator.clipboard.writeText(val);$("#fileMsg").text("คัดลอกผลลัพธ์แล้ว");setTimeout(()=>$("#fileMsg").text(""),2000);}catch(e){console.error(e);$("#fileMsg").text("เบราว์เซอร์ไม่อนุญาตให้คัดลอกอัตโนมัติ");}});});
    </script>
</div>