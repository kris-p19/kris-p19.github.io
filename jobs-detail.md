---
layout: default
title: "ประกาศรับสมัครงานราชการ"
description: "ข่าวสาร บทความ การวิเคราะห์ และความรู้ต่างๆ"
keywords: "fintechxhub.com"
navIndex: "active"
---
<form id="searchForm">
<section class="py-3 bg-white">
  <div class="container">
    <div class="row g-5">
      <div class="col-lg-12">
        <div id="job-detail-container"></div>
      </div>
    </div>
  </div>
</section>
</form>

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
    /* ins.adsbygoogle {
        background: #f0f0f0;
        min-height: 100px;
        display: block !important;
    } */
</style>
<script src="/assets/js/getcode.js?v=2"></script>
<script>
async function queryJobs() {
    try {
        // เรียก API โดยใช้ keyword
        const response = await fetch(`https://nodejsapix.vercel.app/api/load-scaping-a?url=https://jobapp.ocsc.go.th/jobapi/portal/jobs/${window.location.hash.substring(1)}`);
        // ตรวจสอบสถานะการเชื่อมต่อ
        if (!response.ok) {
            throw new Error("ไม่สามารถเชื่อมต่อกับฐานข้อมูลงานราชการได้");
        }
        const data = await response.json();
        // if (Array.isArray(dataRes)) {
            // data.forEach((data, index) => {
                const container = document.getElementById('job-detail-container');
                const formatMoney = (num) => new Intl.NumberFormat('th-TH').format(num);
                const html = `
                <div class="container my-5">
                    <div class="row g-4">
                        <div class="col-lg-8">
                            <div class="card shadow-sm p-4 mb-4">
                                <div class="d-flex align-items-center mb-4">
                                    <img src="${data.seal}" class="me-3" style="width: 70px;">
                                    <div>
                                        <h2 class="fw-bold text-primary mb-0">${data.position}</h2>
                                        <p class="text-muted mb-0">${data.department} | ${data.ministry}</p>
                                    </div>
                                </div>
                                <h5 class="fw-bold border-start border-primary border-4 ps-2 mb-3">รายละเอียดงาน</h5>
                                <div class="job-content mb-4">${data.civilJobDescription}</div>
                                <h5 class="fw-bold border-start border-primary border-4 ps-2 mb-3">คุณสมบัติผู้สมัคร</h5>
                                <div class="p-3 bg-light rounded">${data.civilJobEducation}</div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="card shadow-sm border-top border-primary border-5">
                                <div class="card-body p-4">
                                    <div class="mb-4 text-center">
                                        <span class="text-muted small">เงินเดือนเริ่มต้น</span>
                                        <h3 class="fw-bold text-success">${formatMoney(data.salaryMin)} - ${formatMoney(data.salaryMax)} ฿</h3>
                                    </div>
                                    <div class="d-flex justify-content-between mb-2">
                                        <span class="text-muted">จำนวนที่รับ:</span>
                                        <span class="fw-bold text-dark">${data.positionAmount} อัตรา</span>
                                    </div>
                                    <div class="d-flex justify-content-between mb-4">
                                        <span class="text-muted">ปิดรับสมัคร:</span>
                                        <span class="fw-bold text-danger">${data.applicationEndPrint}</span>
                                    </div>
                                    <a href="${data.url.trim()}" target="_blank" class="btn btn-primary w-100 py-3 fw-bold mb-2">สมัครงานออนไลน์</a>
                                    <a href="${data.fileName}" target="_blank" class="btn btn-outline-danger w-100">
                                        <i class="bi bi-file-pdf"></i> อ่านประกาศฉบับเต็ม
                                    </a>
                                </div>
                            </div>
                            <p class="text-center mt-3 text-muted small">ID ประกาศ: ${data.id}</p>
                        </div>
                    </div>
                </div>
                `;
                container.innerHTML = html;
            // });
        // } else {
        //     throw new Error("รูปแบบข้อมูลที่ได้รับไม่ถูกต้อง");
        // }
    } catch (err) {
        console.error("Fetch Error:", err);
        throw err;
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    await queryJobs();
});
</script>