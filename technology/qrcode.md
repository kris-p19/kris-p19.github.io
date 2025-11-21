---
layout: default
title: "QR Code Generator Pro + Logo"
description: "QR Code Generator Pro + Logo เครื่องมือสร้างคิวอาร์โค้ดออนไลน์ฟรี ใช้งานง่าย รองรับลิงก์ ข้อความ เบอร์โทร อีเมล และ Wi-Fi สร้าง QR Code ได้อย่างรวดเร็ว พร้อมปรับแต่งสี ใส่โลโก้ และดาวน์โหลดไฟล์คุณภาพสูง เหมาะสำหรับธุรกิจ การตลาด สื่อสิ่งพิมพ์ และงานส่วนตัว ใช้งานฟรี ไม่มีลายน้ำ และไม่จำกัดจำนวนการสร้าง"
keywords: "คอมพิวเตอร์, เทคโนโลยีคอมพิวเตอร์, วิวัฒนาการคอมพิวเตอร์, บทบาทของคอมพิวเตอร์, คอมพิวเตอร์ในชีวิตประจำวัน, เทคโนโลยีดิจิทัล, การศึกษาและคอมพิวเตอร์, คอมพิวเตอร์กับเศรษฐกิจ,คอมพิวเตอร์กับการแพทย์, แนวโน้มเทคโนโลยีคอมพิวเตอร์, อนาคตของคอมพิวเตอร์"
urlx: "https://fintechxhub.com/technology/qrcode"
image: "https://cdn.pixabay.com/photo/2020/07/18/13/51/alipay-5417253_1280.jpg"
navTechnology: "active"
---
<div lang="th">
<div>
  <meta charset="UTF-8" />
  <title>QR Code Generator Pro</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- TailwindCSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Icon (optional, heroicons via CDN) -->
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <!-- QRCode.js CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <!-- Custom Tailwind config (optional) -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['system-ui', 'sans-serif'],
          },
          colors: {
            brand: {
              50: '#eff6ff',
              100: '#dbeafe',
              500: '#2563eb',
              600: '#1d4ed8',
              700: '#1e40af',
            }
          }
        }
      }
    };
  </script>
</div>
<div class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">

  <div class="w-full max-w-5xl mx-auto">
    <!-- Header -->
    <header class="flex flex-col gap-2 mb-8 text-center">
      <div class="inline-flex items-center justify-center gap-2 mx-auto px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700 text-xs uppercase tracking-widest text-slate-300">
        <i class="ph ph-qr-code"></i>
        <span>QR Code Generator</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">
        สร้าง <span class="text-brand-400">QR Code</span> แบบมืออาชีพ
      </h1>
      <p class="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
        รองรับข้อความ, URL, เบอร์โทร หรืออะไรก็ได้ เพียงพิมพ์ด้านล่าง แล้วกดสร้างหรือระบบจะสร้างให้อัตโนมัติ
      </p>
    </header>
    <!-- Main layout -->
    <main class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
      <!-- Left: Form -->
      <section class="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl shadow-slate-950/60 p-5 md:p-6 flex flex-col gap-4">
        <div class="flex items-center justify-between gap-3">
          <h2 class="font-semibold text-lg flex items-center gap-2">
            <i class="ph ph-pencil-simple-line text-brand-400"></i>
            ข้อมูลสำหรับสร้าง QR
          </h2>
          <span class="text-xs text-slate-400">อัปเดตอัตโนมัติ</span>
        </div>
        <!-- Text input -->
        <div class="flex-1 flex flex-col gap-2">
          <label for="qr_text" class="text-sm font-medium text-slate-200">
            ข้อความ / URL
          </label>
          <textarea
            id="qr_text"
            class="flex-1 min-h-[120px] resize-y rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500/80 focus:border-brand-500 placeholder:text-slate-500"
            placeholder="เช่น https://example.com หรือ ข้อความทั่วไป"
          >https://example.com</textarea>
          <p class="text-xs text-slate-500">
            * แนะนำ: ใช้ URL ที่ย่อแล้ว หรือข้อความไม่ยาวเกินไป เพื่อให้ QR อ่านง่าย
          </p>
        </div>
        <!-- Options -->
        <div class="grid grid-cols-2 gap-3 text-sm">
          <!-- Size -->
          <div class="flex flex-col gap-1.5">
            <label for="qr_size" class="font-medium text-slate-200">
              ขนาด (px)
            </label>
            <select
              id="qr_size"
              class="rounded-lg bg-slate-950/70 border border-slate-700 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500/80 focus:border-brand-500"
            >
              <option value="180">เล็ก (180)</option>
              <option value="240" selected>ปกติ (240)</option>
              <option value="320">ใหญ่ (320)</option>
              <option value="400">ใหญ่มาก (400)</option>
            </select>
          </div>
          <!-- Error correction -->
          <div class="flex flex-col gap-1.5">
            <label for="qr_ecc" class="font-medium text-slate-200 flex items-center justify-between">
              ความทนทาน
              <span class="text-[10px] text-slate-500 ml-2">Error Correction</span>
            </label>
            <select
              id="qr_ecc"
              class="rounded-lg bg-slate-950/70 border border-slate-700 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500/80 focus:border-brand-500"
            >
              <option value="L">L - ต่ำ (ข้อมูลเยอะ)</option>
              <option value="M" selected>M - ปกติ</option>
              <option value="Q">Q - สูง</option>
              <option value="H">H - สูงมาก (ซ่อนโลโก้ได้)</option>
            </select>
          </div>
          <!-- Margin -->
          <div class="flex flex-col gap-1.5">
            <label for="qr_margin" class="font-medium text-slate-200">
              Margin (ขอบ)
            </label>
            <input
              type="number"
              id="qr_margin"
              min="0"
              max="16"
              value="4"
              class="rounded-lg bg-slate-950/70 border border-slate-700 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500/80 focus:border-brand-500"
            />
          </div>
          <!-- Color (dark) -->
          <div class="flex flex-col gap-1.5">
            <label for="qr_color_dark" class="font-medium text-slate-200">
              สีด้านใน
            </label>
            <input
              type="color"
              id="qr_color_dark"
              value="#020617"
              class="rounded-lg bg-slate-950/70 border border-slate-700 px-2 py-1 h-[38px] outline-none cursor-pointer"
            />
          </div>
        </div>
        <!-- Actions -->
        <div class="flex flex-wrap gap-3 pt-2 border-t border-slate-800 mt-2">
          <button
            id="btn_generate"
            class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-sm font-medium transition-all shadow-lg shadow-brand-950/50 hover:shadow-brand-900/80 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 focus-visible:ring-offset-slate-950"
          >
            <i class="ph ph-play-circle text-base"></i>
            สร้าง QR Code
          </button>
          <button
            id="btn_clear"
            class="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-700/80 hover:border-slate-500 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 transition-all"
          >
            <i class="ph ph-eraser text-base"></i>
            ล้างข้อมูล
          </button>
        </div>
      </section>
      <!-- Right: Preview -->
      <section class="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl shadow-slate-950/60 p-5 md:p-6 flex flex-col items-center">
        <div class="w-full flex items-center justify-between mb-4">
          <h2 class="font-semibold text-lg flex items-center gap-2">
            <i class="ph ph-eyeglasses text-brand-400"></i>
            ตัวอย่าง QR Code
          </h2>
          <span id="qr_status" class="text-xs text-slate-400">
            พร้อมสร้าง
          </span>
        </div>
        <div class="flex-1 flex items-center justify-center w-full">
          <div
            id="qr_container"
            class="inline-flex items-center justify-center bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-800 min-h-[220px] min-w-[220px]"
          >
            <span class="text-xs text-slate-500 text-center">
              ยังไม่มี QR Code<br />
              พิมพ์ข้อความหรือ URL แล้วกด “สร้าง QR Code”
            </span>
          </div>
        </div>
        <div class="mt-5 w-full flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <div class="text-[11px] text-slate-500">
            แนะนำให้ทดสอบสแกนทุกครั้งก่อนนำไปใช้งานจริง
          </div>
          <div class="flex gap-2">
            <button
              id="btn_download"
              class="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-700/80 text-xs font-medium text-slate-200 hover:bg-slate-800/70 hover:border-slate-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              disabled
            >
              <i class="ph ph-download-simple text-sm"></i>
              ดาวน์โหลด PNG
            </button>
            <button
              id="btn_copy_text"
              class="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-xs font-medium text-slate-100 transition-all"
            >
              <i class="ph ph-clipboard-text text-sm"></i>
              คัดลอกข้อความ
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>

  <!-- Script -->
  <script>
    const qrTextEl       = document.getElementById('qr_text');
    const qrSizeEl       = document.getElementById('qr_size');
    const qrEccEl        = document.getElementById('qr_ecc');
    const qrMarginEl     = document.getElementById('qr_margin');
    const qrColorDarkEl  = document.getElementById('qr_color_dark');
    const qrContainer    = document.getElementById('qr_container');
    const btnGenerate    = document.getElementById('btn_generate');
    const btnClear       = document.getElementById('btn_clear');
    const btnDownload    = document.getElementById('btn_download');
    const btnCopyText    = document.getElementById('btn_copy_text');
    const qrStatus       = document.getElementById('qr_status');

    let qrInstance = null;
    let debounceTimer = null;

    const eccMap = {
      L: QRCode.CorrectLevel.L,
      M: QRCode.CorrectLevel.M,
      Q: QRCode.CorrectLevel.Q,
      H: QRCode.CorrectLevel.H,
    };

    function clearQrContainer() {
      qrContainer.innerHTML = '';
    }

    function updateStatus(message, isError = false) {
      qrStatus.textContent = message;
      qrStatus.className =
        'text-xs ' +
        (isError ? 'text-rose-400' : 'text-emerald-400');
    }

    function generateQr() {
      const text = qrTextEl.value.trim();

      if (!text) {
        clearQrContainer();
        qrContainer.innerHTML =
          '<span class="text-xs text-slate-500 text-center">กรุณากรอกข้อความหรือ URL ก่อน</span>';
        btnDownload.disabled = true;
        updateStatus('ยังไม่มีข้อมูล', true);
        return;
      }

      const size = parseInt(qrSizeEl.value, 10) || 240;
      const margin = Math.max(0, parseInt(qrMarginEl.value, 10) || 0);
      const eccLevel = eccMap[qrEccEl.value] || QRCode.CorrectLevel.M;
      const colorDark = qrColorDarkEl.value || '#020617';

      clearQrContainer();

      qrInstance = new QRCode(qrContainer, {
        text,
        width: size,
        height: size,
        colorDark: colorDark,
        colorLight: '#ffffff',
        correctLevel: eccLevel,
        margin: margin,
      });

      btnDownload.disabled = false;
      updateStatus('สร้างแล้ว (พร้อมใช้งาน)');
    }

    function debounceGenerate() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(generateQr, 400);
    }

    // Events
    btnGenerate.addEventListener('click', (e) => {
      e.preventDefault();
      generateQr();
    });

    btnClear.addEventListener('click', () => {
      qrTextEl.value = '';
      clearQrContainer();
      qrContainer.innerHTML =
        '<span class="text-xs text-slate-500 text-center">ยังไม่มี QR Code<br />พิมพ์ข้อความหรือ URL แล้วกด “สร้าง QR Code”</span>';
      btnDownload.disabled = true;
      updateStatus('พร้อมสร้าง', false);
    });

    // Auto-generate on changes
    qrTextEl.addEventListener('input', debounceGenerate);
    qrSizeEl.addEventListener('change', generateQr);
    qrEccEl.addEventListener('change', generateQr);
    qrMarginEl.addEventListener('input', debounceGenerate);
    qrColorDarkEl.addEventListener('input', generateQr);

    // Download PNG
    btnDownload.addEventListener('click', () => {
      const img = qrContainer.querySelector('img');
      const canvas = qrContainer.querySelector('canvas');
      let dataUrl = null;

      if (img && img.src) {
        dataUrl = img.src;
      } else if (canvas) {
        dataUrl = canvas.toDataURL('image/png');
      }

      if (!dataUrl) return;

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    // Copy text
    btnCopyText.addEventListener('click', async () => {
      const text = qrTextEl.value.trim();
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        updateStatus('คัดลอกข้อความแล้ว', false);
        setTimeout(() => updateStatus('สร้างแล้ว (พร้อมใช้งาน)'), 1500);
      } catch (err) {
        updateStatus('คัดลอกไม่สำเร็จ', true);
      }
    });

    // สร้างตัวอย่างเริ่มต้น
    window.addEventListener('load', generateQr);
  </script>
</div>
</div>