---
layout: default
title: "แปลง JavaScript เป็น Minify (ลบ Comment อย่างปลอดภัย)"
description: "เครื่องมือช่วยแปลงโค้ด JavaScript เป็นเวอร์ชัน minify โดยลบ comment อัตโนมัติ พร้อมวิเคราะห์ขนาดโค้ด"
keywords: "javascript minify, ลบ comment, แปลงโค้ด js, js minifier"
navMinify: "active"
---

<div class="container py-5">
  <!-- HERO -->
  <header class="text-center mb-5">
    <h1 class="display-5 fw-bold">
      แปลง JavaScript เป็น Minify
    </h1>
    <p class="lead text-muted">
      วางโค้ด JavaScript ของคุณ แล้วให้ระบบช่วยลบ comment และจัดการให้อย่างเรียบร้อย
      โดยยังคงทำงานได้เหมือนเดิมสำหรับโค้ดทั่วไป
    </p>
    <div class="d-flex justify-content-center gap-3 mt-4">
      <button id="btnMinifyNow"
              class="btn btn-lg btn-primary rounded-pill px-4 shadow-sm hover:shadow-lg transition
                     bg-gradient-to-r from-indigo-500 to-purple-600 border-0">
        แปลงเป็น Minify ทันที
      </button>
      <button id="btnSample"
              class="btn btn-lg btn-outline-secondary rounded-pill px-4 shadow-sm hover:shadow-lg transition">
        ใส่โค้ดตัวอย่าง
      </button>
    </div>
  </header>
  <div class="row g-4">
    <!-- LEFT: INPUT -->
    <div class="col-lg-6">
      <div class="card shadow-sm rounded-4 h-100">
        <div class="card-body p-4">
          <h2 class="h5 fw-semibold mb-3">โค้ดต้นฉบับ (Original JavaScript)</h2>
          <p class="text-muted small mb-3">
            วางโค้ด JavaScript ที่ต้องการแปลงลงในกล่องด้านล่าง
          </p>
          <div class="mb-3">
            <textarea id="inputCode"
                      class="form-control font-monospace"
                      rows="16"
                      placeholder="// วางโค้ด JavaScript ที่นี่..."></textarea>
          </div>
          <!-- OPTIONS -->
          <div class="mb-3">
            <label class="form-label fw-semibold">ตัวเลือกการแปลง</label>
            <div class="row g-2">
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="optRemoveComments" checked>
                  <label class="form-check-label" for="optRemoveComments">
                    ลบ comment ทั้งแบบ <code>//</code> และ <code>/* ... */</code>
                  </label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="optKeepLicense">
                  <label class="form-check-label" for="optKeepLicense">
                    คงไว้เฉพาะ comment ที่ขึ้นต้นด้วย <code>/*! ... */</code> (เช่น license)
                  </label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="optTrimLines" checked>
                  <label class="form-check-label" for="optTrimLines">
                    ตัดช่องว่างส่วนเกินต้น–ท้ายแต่ละบรรทัด
                  </label>
                </div>
              </div>
              <div class="col-12">
                  <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="optSingleLine">
                      <label class="form-check-label" for="optSingleLine">
                          แปลงผลลัพธ์เป็นโหมด Single Line (บรรทัดเดียว)
                      </label>
                  </div>
              </div>
            </div>
          </div>
          <div class="d-flex gap-2">
            <button id="btnMinify" class="btn btn-success rounded-pill px-3">
              แปลงโค้ดเป็น Minify
            </button>
            <button id="btnClear" class="btn btn-outline-secondary rounded-pill px-3">
              ล้างโค้ด
            </button>
          </div>
          <hr class="my-4">
          <div class="bg-light rounded-4 p-3 text-muted small">
            <strong>หมายเหตุ:</strong>
            เครื่องมือนี้เน้นการลบ comment และจัดการช่องว่างพื้นฐานให้โค้ดอ่านง่ายขึ้นและไฟล์เล็กลง
            สำหรับการ minify ขั้นสูง (เช่น เปลี่ยนชื่อตัวแปร, บีบโครงสร้าง) แนะนำใช้เครื่องมืออย่าง
            Terser / UglifyJS ร่วมด้วย
          </div>
        </div>
      </div>
    </div>
    <!-- RIGHT: OUTPUT -->
    <div class="col-lg-6">
      <div class="card border-0 shadow-lg rounded-4 h-100 overflow-hidden">
        <div class="card-header border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2 class="h6 mb-0 fw-semibold">ผลลัพธ์ (Minify แล้ว)</h2>
              <small class="opacity-75 d-block">โค้ดที่ผ่านการลบ comment และจัดรูปแบบพื้นฐาน</small>
            </div>
            <div class="text-end small">
              <div><span class="opacity-75">ก่อน:</span> <span id="statOriginal">0</span> bytes</div>
              <div><span class="opacity-75">หลัง:</span> <span id="statMinified">0</span> bytes</div>
              <div><span class="opacity-75">ประหยัด:</span> <span id="statSaved">0%</span></div>
            </div>
          </div>
        </div>
        <div class="card-body p-4 d-flex flex-column h-100">
          <div class="mb-3 flex-grow-1">
            <textarea id="outputCode"
                      class="form-control font-monospace"
                      rows="14"
                      placeholder="ผลลัพธ์จะแสดงที่นี่..."
                      readonly></textarea>
          </div>
          <div class="d-flex flex-wrap gap-2 justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <button id="btnCopyOutput" class="btn btn-outline-light text-dark bg-white rounded-pill btn-sm">
                คัดลอกโค้ดที่แปลงแล้ว
              </button>
              <button id="btnDownload" class="btn btn-outline-primary rounded-pill btn-sm">
                ดาวน์โหลดเป็นไฟล์ .js
              </button>
            </div>
            <div class="text-muted small">
              พยายามรักษาการทำงานของโค้ดเดิมให้เหมือนเดิมสำหรับกรณีทั่วไป
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- JS: Minify Engine -->
<script src="javascript-to-minify.js"></script>