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
        <h1 class="display-4 fw-bold mb-3" style="color: #202124;">เครื่องมือย่อลิงก์ให้สั้นลง ฟรี</h1>
        <p class="fs-5 text-secondary mb-5">
          สร้าง Short URL ที่จดจำง่าย ปลอดภัย และใช้งานได้ทันที พร้อมระบบจัดการลิงก์ที่รวดเร็วที่สุด
        </p>
        <div class="p-4 p-md-5 bg-light rounded-5 shadow-sm border">
          <h3 class="mb-4 fw-medium" style="color: #202124;">วางลิงก์ที่ต้องการแปลงที่นี่</h3>
          <div class="input-group input-group-lg mb-3">
            <input type="url" id="longUrl" class="form-control border-0 shadow-none ps-4" 
                   placeholder="เช่น https://www.your-long-website.com/data/page-1" 
                   style="border-radius: 50px 0 0 50px;">
            <button class="btn btn-primary px-4 fw-medium" type="button" id="shortenBtn" 
                    style="border-radius: 0 50px 50px 0;">
              ย่อลิงก์เลย
            </button>
          </div>
          <div id="resultArea" class="d-none mt-4">
            <p class="text-muted mb-2">ลิงก์ใหม่ที่ย่อเสร็จแล้ว:</p>
            <div class="d-flex align-items-center justify-content-center gap-2 flex-wrap">
              <h4 id="shortUrlText" class="text-primary mb-0 fw-bold decoration-none"></h4>
              <button class="btn btn-sm btn-outline-primary rounded-pill px-3" onclick="copyToClipboard()">
                <i class="bi bi-clipboard-check"></i> คัดลอกลิงก์
              </button>
            </div>
          </div>
          <div id="errorArea" class="d-none mt-3 text-danger small"></div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5 bg-light">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 border-0 bg-transparent">
          <div class="card-body">
            <h5 class="fw-bold"><i class="bi bi-lightning-charge text-primary"></i> รวดเร็วและง่ายดาย</h5>
            <p class="text-secondary small">เพียงแค่วางลิงก์ที่ยาวเหยียดลงในช่อง เครื่องมือของเราจะแปลงเป็น Short URL ขนาดกะทัดรัดภายในเสี้ยววินาที</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 border-0 bg-transparent">
          <div class="card-body">
            <h5 class="fw-bold"><i class="bi bi-shield-check text-primary"></i> ปลอดภัย 100%</h5>
            <p class="text-secondary small">ลิงก์ของคุณจะถูกส่งผ่านโปรโตคอล HTTPS ที่มีความปลอดภัย มั่นใจได้ว่าทุกลิงก์ที่คุณย่อจะทำงานได้อย่างไม่มีปัญหา</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 border-0 bg-transparent">
          <div class="card-body">
            <h5 class="fw-bold"><i class="bi bi-graph-up text-primary"></i> ดีต่อการแชร์ในโซเชียล</h5>
            <p class="text-secondary small">เหมาะสำหรับการแชร์ใน Facebook, Line, Twitter หรือ Instagram เพื่อประหยัดพื้นที่และทำให้โพสต์ของคุณดูสะอาดตา</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <hr class="my-5 opacity-10">
        <h2 class="h4 fw-bold mb-4">ทำไมต้องใช้เครื่องมือย่อลิงก์ (Short URL)?</h2>
        <p class="text-secondary">
          การใช้งาน <strong>Short URL</strong> หรือการย่อลิงก์ ไม่ใช่แค่การทำให้ลิงก์สั้นลงเท่านั้น แต่ยังช่วยในเรื่องของ Branding และความน่าเชื่อถือ ลิงก์ที่ยาวเกินไปอาจถูกมองว่าเป็นสแปมในบางกรณี การใช้เครื่องมือ <strong>ย่อลิงก์ฟรี</strong> ของเราจะช่วยให้คุณบริหารจัดการสื่อออนไลน์ได้มีประสิทธิภาพมากขึ้น ไม่ว่าจะเป็นการนำไปใส่ในประวัติ Bio หรือส่งต่อให้เพื่อนผ่านทางแอปพลิเคชันแชทต่างๆ
        </p>
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