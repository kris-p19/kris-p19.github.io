---
layout: default
title: "ShortURL"
description: "ข่าวสาร บทความ การวิเคราะห์ และความรู้ต่างๆ"
keywords: "fintechxhub.com"
navIndex: "active"
---

<section class="py-10 bg-white">
  <div class="container">
    <div class="row align-items-center justify-content-center g-5">
      <div class="col-lg-8 text-center">
        <div class="p-4 p-md-5 bg-light rounded-5 shadow-sm">
          <h3 class="mb-4 fw-medium" style="color: #202124;">วางลิงก์ที่ต้องการย่อ</h3>
          <div class="input-group input-group-lg mb-3">
            <input type="url" id="longUrl" class="form-control border-0 shadow-none ps-4" placeholder="https://example.com/very-long-link" style="border-radius: 50px 0 0 50px;">
            <button class="btn btn-primary px-4 fw-medium" type="button" id="shortenBtn" style="border-radius: 0 50px 50px 0;">
              ย่อลิงก์
            </button>
          </div>
          <div id="resultArea" class="d-none mt-4 animate__animated animate__fadeIn">
            <p class="text-secondary mb-2">ลิงก์ใหม่ของคุณ:</p>
            <div class="d-flex align-items-center justify-content-center gap-2">
              <h4 id="shortUrlText" class="text-primary mb-0 fw-bold"></h4>
              <button class="btn btn-sm btn-outline-primary rounded-pill" onclick="copyToClipboard()">คัดลอก</button>
            </div>
          </div>
          <div id="errorArea" class="d-none mt-3 text-danger"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-10 bg-white text-center">
    <div class="container">
        <div class="row align-items-center justify-content-between g-5">
            <div class="col-lg-12">
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-format="autorelaxed"
                    data-ad-client="ca-pub-3203802670121740"
                    data-ad-slot="6661184954"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        </div>
    </div>
</section>

<style>
  /* เพิ่มเอฟเฟกต์ยกตัวขึ้นเวลาเอาเมาส์วางแบบ Google */
  .transition-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important;
  }
</style>
<script>
// ฟังก์ชันหลักที่คุณให้มา
async function shortenUrl(url) {
  try {
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.shorturl) {
      return data.shorturl;
    } else {
      throw new Error(data.errormessage || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
    }
  } catch (err) {
    throw err;
  }
}

// การทำงานเมื่อกดปุ่ม
document.getElementById('shortenBtn').addEventListener('click', async () => {
  const urlInput = document.getElementById('longUrl');
  const btn = document.getElementById('shortenBtn');
  const resultArea = document.getElementById('resultArea');
  const errorArea = document.getElementById('errorArea');
  const shortUrlText = document.getElementById('shortUrlText');

  // ล้างสถานะเดิม
  resultArea.classList.add('d-none');
  errorArea.classList.add('d-none');
  
  if (!urlInput.value) {
    alert("กรุณาวางลิงก์ก่อนครับ");
    return;
  }

  // แสดงสถานะกำลังโหลด
  btn.disabled = true;
  btn.innerText = "กำลังย่อ...";

  try {
    const shortLink = await shortenUrl(urlInput.value);
    
    // แสดงผลลัพธ์
    shortUrlText.innerText = shortLink;
    resultArea.classList.remove('d-none');
    urlInput.value = ""; // ล้างค่าในช่อง input
  } catch (error) {
    errorArea.innerText = "Error: " + error.message;
    errorArea.classList.remove('d-none');
  } finally {
    btn.disabled = false;
    btn.innerText = "ย่อลิงก์";
  }
});

// ฟังก์ชันสำหรับปุ่มคัดลอก
function copyToClipboard() {
  const text = document.getElementById('shortUrlText').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("คัดลอกลิงก์แล้ว!");
  });
}
</script>
<!-- /Category Section Section -->