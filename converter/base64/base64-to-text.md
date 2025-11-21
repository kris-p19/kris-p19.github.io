---
layout: default
title: "Base64 to Text Converter | ถอดรหัส Base64 เป็นข้อความ ออนไลน์ฟรี"
description: "ถอดรหัส Base64 เป็นข้อความ (Base64 to Text) ออนไลน์ฟรี รองรับภาษาไทยและ Unicode ทำงานบนเบราว์เซอร์ 100% ปลอดภัย ไม่ส่งข้อมูลขึ้นเซิร์ฟเวอร์ ใช้งานง่าย คัดลอกผลลัพธ์ได้ทันที."
keywords: "base64 to text, decode base64, แปลง base64 เป็นข้อความ, base64 decode, base64 converter, ถอดรหัส base64, online converter, base64 tool, base64 decoder, ข้อความจาก base64"
---
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<div class="container py-5">
    <div class="max-w-3xl mx-auto mt-10 bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h1 class="text-2xl font-bold mb-2">Base64 → Text Converter</h1>
        <p class="text-sm text-slate-500 mb-6">
        วางข้อมูล Base64 แล้วถอดเป็นข้อความได้ทันที รองรับภาษาไทยและ Unicode ทั้งหมด ทำงานบนเบราว์เซอร์ 100% ไม่อัปโหลดข้อมูลขึ้นเซิร์ฟเวอร์
        </p>
        <!-- Base64 Input -->
        <div class="mb-4">
        <label for="base64Input" class="block text-sm font-semibold mb-1">Base64 Input</label>
        <textarea id="base64Input"
            class="w-full min-h-[200px] rounded-xl border border-slate-200 px-3 py-2 text-sm font-mono
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="วาง Base64 ที่นี่ (เฉพาะส่วน data Base64 ของข้อความ หรือทั้ง data:mime/type;base64,...)"></textarea>
        </div>
        <!-- Buttons -->
        <div class="flex flex-wrap items-center gap-3 mb-4">
        <button id="btnB64ToText"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl">
            แปลงเป็นข้อความ
        </button>
        <button id="btnCopyText"
            class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-xl">
            คัดลอกผลลัพธ์
        </button>
        <span id="b64Msg" class="text-xs text-green-600"></span>
        </div>
        <!-- Output -->
        <label for="textOutput" class="block text-sm font-semibold mb-1">Text Output</label>
        <textarea id="textOutput"
        class="w-full min-h-[200px] rounded-xl border border-slate-200 px-3 py-2 text-sm font-mono bg-slate-50"
        placeholder="ข้อความที่ถอดจาก Base64 จะแสดงที่นี่..." readonly></textarea>
        <p class="text-xs text-slate-500 mt-3">
        * รองรับทั้ง Base64 ล้วน ๆ หรือ Base64 ที่มากับรูปแบบ <code>data:&lt;mime&gt;;base64,&lt;data&gt;</code><br>
        * ใช้การถอดรหัสแบบ UTF-8 รองรับภาษาไทยและ Unicode ครบถ้วน
        </p>
    </div>
    <!-- JavaScript (single line) -->
    <script>
    $(function(){$("#btnB64ToText").on("click",function(){$("#b64Msg").text("");let raw=$("#base64Input").val().trim();if(!raw){$("#b64Msg").text("กรุณาวางข้อมูล Base64 ก่อน");return;}if(raw.startsWith("data:")){let commaIndex=raw.indexOf(",");if(commaIndex===-1){$("#b64Msg").text("รูปแบบ Data URL ไม่ถูกต้อง (ไม่มีเครื่องหมาย ,)");return;}raw=raw.substring(commaIndex+1);}raw=raw.replace(/\s+/g,"");try{let decoded=decodeURIComponent(escape(atob(raw)));$("#textOutput").val(decoded);$("#b64Msg").text("ถอดรหัส Base64 เป็นข้อความสำเร็จ");}catch(e){console.error(e);$("#textOutput").val("");$("#b64Msg").text("ไม่สามารถถอดรหัส Base64 ได้ กรุณาตรวจสอบข้อมูลอีกครั้ง");}});$("#btnCopyText").on("click",async function(){let v=$("#textOutput").val();if(!v)return;try{await navigator.clipboard.writeText(v);$("#b64Msg").text("คัดลอกผลลัพธ์แล้ว");setTimeout(()=>$("#b64Msg").text(""),2000);}catch(e){$("#b64Msg").text("ไม่สามารถคัดลอกได้");}});});
    </script>
</div>