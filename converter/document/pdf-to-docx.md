---
layout: default
title: "แปลง PDF เป็น Word (DOCX) ออนไลน์"
description: "หน้าเว็บแปลงไฟล์ PDF เป็น Word (DOC/DOCX) ด้วยเบราว์เซอร์ แปลงไฟล์ PDF เป็น Word ออนไลน์ โดยทำงานทั้งหมดในเบราว์เซอร์ ไม่ต้องมีเซิร์ฟเวอร์หลังบ้าน"
keywords: "pdf to word, pdf to docx, แปลง pdf เป็น word, pdf converter, aspose pdf js"
navPdfWord: "active"
---
<div class="container py-5">
  <!-- HERO -->
  <header class="text-center mb-5">
    <h1 class="display-5 fw-bold">
      แปลง PDF เป็น Word (.docx)
    </h1>
    <p class="lead text-muted">
      เครื่องมือแปลงไฟล์ PDF เป็น Word ที่ทำงานบนเบราว์เซอร์ทั้งหมด
      ไม่ต้องอัปโหลดขึ้นเซิร์ฟเวอร์ เหมาะกับงานที่ต้องการความเป็นส่วนตัว
    </p>
    <div class="d-flex justify-content-center gap-3 mt-4">
      <button id="btnChooseFileHero"
              class="btn btn-lg btn-primary rounded-pill px-4 shadow-sm
                     bg-gradient-to-r border-0">
        เลือกไฟล์ PDF เพื่อแปลง
      </button>
      <button id="btnClearHero"
              class="btn btn-lg btn-outline-secondary rounded-pill px-4 shadow-sm">
        ล้างรายการไฟล์
      </button>
    </div>
  </header>
  <div class="row g-4">
    <!-- LEFT: INPUT -->
    <div class="col-lg-6">
      <div class="card shadow-sm rounded-4 h-100">
        <div class="card-body p-4">
          <h2 class="h5 fw-semibold mb-3">อัปโหลดไฟล์ PDF</h2>
          <p class="text-muted small mb-3">
            แนะนำไฟล์ PDF ที่เป็นตัวอักษร (ไม่ใช่สแกนเป็นรูปภาพ) จะให้ผลลัพธ์ดีที่สุด
          </p>
          <!-- FILE INPUT (ซ่อน) -->
          <input type="file"
                 id="inputPdfFile"
                 accept="application/pdf"
                 class="d-none">
          <!-- DROPZONE -->
          <div id="dropZone"
               class="border border-2 border-dashed rounded-4 p-4 text-center mb-3 bg-light-subtle">
            <div class="mb-2">
              <i class="bi bi-file-earmark-pdf fs-1"></i>
            </div>
            <p class="mb-1 fw-semibold">ลากและวางไฟล์ PDF ที่นี่</p>
            <p class="text-muted small mb-2">
              หรือคลิกปุ่มด้านล่างเพื่อเลือกไฟล์จากเครื่องของคุณ
            </p>
            <button id="btnChooseFile"
                    class="btn btn-outline-primary rounded-pill px-3 btn-sm">
              เลือกไฟล์ PDF
            </button>
          </div>
          <!-- FILE INFO -->
          <div id="fileInfoWrapper" class="d-none mb-3">
            <div class="alert alert-secondary rounded-4 d-flex justify-content-between align-items-center mb-2">
              <div>
                <div class="fw-semibold">
                  <span id="fileName">ไม่มีไฟล์ที่เลือก</span>
                </div>
                <div class="small text-muted">
                  ขนาดไฟล์: <span id="fileSize">-</span>
                </div>
              </div>
              <button id="btnRemoveFile"
                      class="btn btn-sm btn-outline-danger rounded-pill">
                ลบไฟล์
              </button>
            </div>
          </div>
          <!-- OPTIONS -->
          <div class="mb-3">
            <label class="form-label fw-semibold">ตัวเลือกการแปลง (พื้นฐาน)</label>
            <div class="row g-2">
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="optSplitParagraph" checked>
                  <label class="form-check-label" for="optSplitParagraph">
                    แยกย่อหน้าตามบรรทัดว่าง (ช่วยให้อ่านใน Word สบายตา)
                  </label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="optTrimSpaces" checked>
                  <label class="form-check-label" for="optTrimSpaces">
                    ตัดช่องว่างส่วนเกินต้น–ท้ายแต่ละบรรทัด
                  </label>
                </div>
              </div>
              <div class="col-12">
                <label class="form-label small mb-1" for="selectFontSize">
                  ขนาดตัวอักษรเริ่มต้นใน Word
                </label>
                <select id="selectFontSize" class="form-select form-select-sm">
                  <option value="20">ปกติ (ประมาณ 10pt)</option>
                  <option value="24">ใหญ่เล็กน้อย (ประมาณ 12pt)</option>
                  <option value="28">ใหญ่ (ประมาณ 14pt)</option>
                </select>
              </div>
            </div>
          </div>
          <!-- ACTION BUTTONS -->
          <div class="d-flex flex-wrap gap-2">
            <button id="btnConvert"
                    class="btn btn-success rounded-pill px-3">
              แปลงเป็น Word (.docx)
            </button>
            <button id="btnClear"
                    class="btn btn-outline-secondary rounded-pill px-3">
              ล้างข้อมูลทั้งหมด
            </button>
          </div>
          <hr class="my-4">
          <div class="bg-light rounded-4 p-3 text-muted small">
            <strong>หมายเหตุ:</strong>
            วิธีนี้ใช้ไลบรารีฟรี (pdf.js + docx.js) ทำงานในเบราว์เซอร์
            เหมาะสำหรับการดึงข้อความออกจาก PDF แล้วแปลงเป็น Word
            แต่ไม่สามารถคง Layout ซับซ้อนเช่นตารางและรูปภาพได้ครบเหมือนเดิม
          </div>
        </div>
      </div>
    </div>
    <!-- RIGHT: OUTPUT / STATUS -->
    <div class="col-lg-6">
      <div class="card border-0 shadow-lg rounded-4 h-100 overflow-hidden">
        <div class="card-header border-0 bg-gradient-to-r py-3 text-white">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2 class="h6 mb-0 fw-semibold">สถานะการแปลงไฟล์</h2>
              <small class="opacity-75 d-block">
                ทุกอย่างทำงานในเบราว์เซอร์ของคุณ ไฟล์จะไม่ถูกอัปโหลดไปยังเซิร์ฟเวอร์
              </small>
            </div>
            <div class="text-end small">
              <div><span class="opacity-75">ขนาด PDF:</span> <span id="statPdfSize">0</span></div>
              <div><span class="opacity-75">ขนาด Word:</span> <span id="statDocxSize">0</span></div>
              <div><span class="opacity-75">ใช้เวลา:</span> <span id="statTimeUsed">0s</span></div>
            </div>
          </div>
        </div>
        <div class="card-body p-4 d-flex flex-column h-100">
          <!-- STATUS AREA -->
          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-semibold">สถานะปัจจุบัน:</span>
              <span id="statusBadge" class="badge bg-secondary rounded-pill">
                รอเลือกไฟล์
              </span>
            </div>
            <div class="progress rounded-pill" style="height: 12px;">
              <div id="progressBar"
                   class="progress-bar"
                   role="progressbar"
                   style="width: 0%;"
                   aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="small text-muted mt-2" id="statusText">
              กรุณาเลือกไฟล์ PDF และกดปุ่ม "แปลงเป็น Word (.docx)" เพื่อเริ่มการแปลง
            </div>
          </div>
          <!-- RESULT AREA -->
          <div class="mb-3 flex-grow-1">
            <label class="form-label fw-semibold">ผลลัพธ์ไฟล์ที่แปลงแล้ว</label>
            <div class="border rounded-4 p-3 bg-light-subtle d-flex flex-column h-100 justify-content-center text-center">
              <div id="resultEmptyState">
                <p class="text-muted mb-2">
                  ยังไม่มีไฟล์ที่แปลงเสร็จ
                </p>
                <p class="small text-muted mb-0">
                  เมื่อแปลงเสร็จ คุณสามารถดาวน์โหลดไฟล์ Word ได้จากปุ่มด้านล่าง
                </p>
              </div>
              <div id="resultReadyState" class="d-none">
                <p class="fw-semibold mb-1">
                  แปลงไฟล์เสร็จเรียบร้อยแล้ว 🎉
                </p>
                <p class="small text-muted mb-0">
                  คลิกปุ่มด้านล่างเพื่อดาวน์โหลดไฟล์ Word (.docx)
                </p>
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap gap-2 justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <button id="btnDownloadDocx"
                      class="btn btn-outline-primary rounded-pill btn-sm"
                      disabled>
                ดาวน์โหลดไฟล์ Word
              </button>
            </div>
            <div class="text-muted small text-end">
              แนะนำให้ตรวจทานเนื้อหาและจัดรูปแบบใหม่ใน Word ตามต้องการ
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Aspose PDF JS via C++ (WASM) from jsDelivr CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/docx/8.5.0/docx.js"></script>
<script src="pdf-to-docx.js?v=2"></script>