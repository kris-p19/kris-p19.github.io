---
layout: default
title: "แปลง PDF เป็น Word (DOCX) ออนไลน์"
description: "หน้าเว็บแปลงไฟล์ PDF เป็น Word (DOC/DOCX) ด้วยเบราว์เซอร์ โดยใช้ Aspose.PDF for JavaScript via C++ ผ่าน CDN (jsDelivr) รองรับไฟล์หลายหน้า ความแม่นยำสูง"
keywords: "pdf to word, pdf to docx, แปลง pdf เป็น word, pdf converter, aspose pdf js"
navPdfWord: "active"
---
<div class="container py-5">
  <!-- HERO -->
  <header class="text-center mb-5">
    <h1 class="display-5 fw-bold">แปลงไฟล์ PDF เป็น Word (DOCX)</h1>
    <p class="lead text-muted">
      อัปโหลดไฟล์ PDF ของคุณ แล้วให้ระบบช่วยแปลงเป็นเอกสาร Word (DOC/DOCX)
      ด้วยเอนจิน Aspose.PDF บนเบราว์เซอร์โดยตรง ผ่าน CDN ฟรี ไม่ต้องติดตั้งโปรแกรมเพิ่ม
    </p>
    <div class="d-flex justify-content-center gap-3 mt-4">
      <button id="btnQuickSample"
              class="btn btn-lg btn-primary rounded-pill px-4 shadow-sm hover:shadow-lg transition
                     bg-gradient-to-r from-indigo-500 to-purple-600 border-0">
        ทดลองกับไฟล์ตัวอย่าง
      </button>
      <button id="btnResetAll"
              class="btn btn-lg btn-outline-secondary rounded-pill px-4 shadow-sm hover:shadow-lg transition">
        ล้างการตั้งค่า/ผลลัพธ์
      </button>
    </div>
  </header>

  <div class="row g-4">
    <!-- LEFT: UPLOAD & OPTIONS -->
    <div class="col-lg-5">
      <div class="card shadow-sm rounded-4 h-100">
        <div class="card-body p-4">
          <h2 class="h5 fw-semibold mb-3">1. เลือกไฟล์ PDF</h2>
          <!-- DROPZONE -->
          <div id="pdfDropZone"
               class="border border-2 border-dashed rounded-4 p-4 mb-3 text-center bg-light hover:bg-slate-50 cursor-pointer">
            <div class="mb-2">
              <i class="bi bi-cloud-arrow-up fs-1 text-primary"></i>
            </div>
            <p class="fw-semibold mb-1">ลากไฟล์ PDF มาวางที่นี่</p>
            <p class="text-muted small mb-2">หรือคลิกเพื่อเลือกไฟล์จากเครื่องของคุณ</p>
            <input type="file" id="pdfFileInput" accept="application/pdf" class="d-none">
            <button type="button" id="btnChooseFile" class="btn btn-sm btn-outline-primary rounded-pill px-3">
              เลือกไฟล์ PDF
            </button>
          </div>
          <!-- FILE INFO -->
          <div id="pdfFileInfo" class="alert alert-secondary d-none rounded-4 small mb-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="fw-semibold">
                  <span class="me-1">ไฟล์ที่เลือก:</span>
                  <span id="pdfFileNameText"></span>
                </div>
                <div class="text-muted">
                  ขนาดไฟล์: <span id="pdfFileSizeText"></span>
                </div>
              </div>
              <button type="button" id="btnClearFile" class="btn btn-sm btn-outline-danger rounded-pill">
                ลบไฟล์
              </button>
            </div>
          </div>
          <hr class="my-4">
          <!-- OPTIONS -->
          <h3 class="h6 fw-semibold mb-3">2. ตั้งค่าการแปลง</h3>
          <!-- OUTPUT FORMAT -->
          <div class="mb-3">
            <label class="form-label fw-semibold">รูปแบบเอกสาร Word ที่ต้องการ</label>
            <div class="d-flex flex-wrap gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="outFormat" id="outDocx" value="docx" checked>
                <label class="form-check-label" for="outDocx">
                  DOCX (Word รุ่นใหม่) <span class="badge bg-success ms-1">แนะนำ</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="outFormat" id="outDoc" value="doc">
                <label class="form-check-label" for="outDoc">
                  DOC (Word รุ่นเก่า)
                </label>
              </div>
            </div>
            <small class="text-muted">
              ถ้าใช้ Microsoft Word รุ่นใหม่ (2007 ขึ้นไป) แนะนำเลือก DOCX เพื่อความเข้ากันได้ดีที่สุด
            </small>
          </div>
          <!-- OUTPUT NAME -->
          <div class="mb-3">
            <label for="outFileBaseName" class="form-label fw-semibold">ชื่อไฟล์ผลลัพธ์ (ไม่ต้องใส่นามสกุล)</label>
            <input type="text" id="outFileBaseName" class="form-control" placeholder="เช่น ResultPDFtoDocx">
            <small class="text-muted">
              ถ้าเว้นว่าง ระบบจะตั้งชื่ออัตโนมัติตามไฟล์ PDF ต้นฉบับ
            </small>
          </div>
          <!-- PAGES / NOTE -->
          <div class="mb-3">
            <label class="form-label fw-semibold">ช่วงหน้า (option)</label>
            <input type="text" id="pageRange" class="form-control" placeholder="เช่น 1-3,5,8 (ยังไม่บังคับใช้ – แปลงทุกหน้า)">
            <small class="text-muted">
              ตอนนี้ตัวอย่างนี้จะแปลงทุกหน้าเสมอ — ช่องนี้เผื่อขยายฟีเจอร์ในอนาคต
            </small>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="optUseWorker" checked>
            <label class="form-check-label" for="optUseWorker">
              ใช้งาน Web Worker (แนะนำ – ไม่ค้างหน้าเว็บเวลาประมวลผล)
            </label>
          </div>
          <!-- ACTION BUTTON -->
          <div class="d-grid gap-2 mt-4">
            <button id="btnConvert" class="btn btn-success rounded-pill py-2">
              แปลงเป็น Word ตอนนี้
            </button>
          </div>
          <hr class="my-4">
          <div class="bg-light rounded-4 p-3 text-muted small">
            <strong>หมายเหตุ:</strong>
            การแปลง PDF เป็น Word ใช้ทรัพยากรค่อนข้างมาก โดยเฉพาะไฟล์ที่มีหลายหน้า / รูปภาพเยอะ
            แนะนำให้ใช้ Web Worker (ติ๊กตัวเลือกด้านบน) เพื่อไม่ให้หน้าเว็บค้าง
          </div>
        </div>
      </div>
    </div>
    <!-- RIGHT: STATUS & RESULT -->
    <div class="col-lg-7">
      <div class="card border-0 shadow-lg rounded-4 h-100">
        <div class="card-header border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2 class="h6 mb-0 fw-semibold">สถานะการแปลง & ดาวน์โหลดผลลัพธ์</h2>
              <small class="opacity-75 d-block">
                ระบบจะอัปเดตสถานะอัตโนมัติเมื่อเริ่ม/เสร็จการแปลงไฟล์
              </small>
            </div>
            <div class="text-end small">
              <div><span class="opacity-75">ขนาดไฟล์ต้นฉบับ:</span> <span id="statInputSize">-</span></div>
              <div><span class="opacity-75">รูปแบบผลลัพธ์:</span> <span id="statOutputFormat">-</span></div>
            </div>
          </div>
        </div>
        <div class="card-body p-4 d-flex flex-column">
          <!-- STATUS -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-semibold">สถานะ:</span>
              <span id="statusBadge" class="badge bg-secondary">พร้อมเริ่มแปลง</span>
            </div>
            <div class="progress rounded-pill" style="height: 10px;">
              <div id="statusProgressBar"
                   class="progress-bar bg-info"
                   role="progressbar"
                   style="width: 0%;"
                   aria-valuenow="0"
                   aria-valuemin="0"
                   aria-valuemax="100"></div>
            </div>
            <div id="statusText" class="small text-muted mt-2">
              เลือกไฟล์ PDF และกด “แปลงเป็น Word ตอนนี้” เพื่อเริ่มใช้งาน
            </div>
          </div>
          <!-- RESULT -->
          <div class="mb-3">
            <h3 class="h6 fw-semibold mb-2">ไฟล์ Word ที่ได้</h3>
            <div id="resultBox" class="border rounded-4 p-3 bg-light d-flex flex-column gap-2">
              <div class="small text-muted" id="resultPlaceholder">
                ยังไม่มีผลลัพธ์ กรุณาแปลงไฟล์ PDF ก่อน
              </div>
              <div id="resultContent" class="d-none">
                <div class="mb-1">
                  <span class="fw-semibold me-1">ชื่อไฟล์:</span>
                  <span id="resultFileName"></span>
                </div>
                <div class="mb-2 small text-muted">
                  ขนาดโดยประมาณ: <span id="resultFileSize">ไม่ทราบแน่ชัด (ขึ้นอยู่กับเอนจินภายใน)</span>
                </div>
                <div class="d-flex flex-wrap gap-2">
                  <a id="btnDownloadResult"
                     href="#"
                     class="btn btn-primary btn-sm rounded-pill px-3"
                     download>
                    ดาวน์โหลดไฟล์ Word
                  </a>
                  <button id="btnClearResult"
                          class="btn btn-outline-secondary btn-sm rounded-pill px-3">
                    ล้างผลลัพธ์
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- FOOTER INFO -->
          <div class="mt-auto pt-3 text-muted small">
            แปลงด้วย <strong>Aspose.PDF for JavaScript via C++</strong> ผ่าน CDN ของ jsDelivr
            (โหมด evaluation – สำหรับใช้งาน/ทดลองทั่วไปบนเว็บ)
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Aspose PDF JS via C++ (WASM) from jsDelivr CDN -->
<script src="https://cdn.jsdelivr.net/npm/aspose-pdf-js@25.10.0/AsposePDFforJS.js"></script>
<script src="pdf-to-docx.js"></script>