---
layout: default
title: "ประกาศรับสมัครงานราชการ"
description: "ข่าวสาร บทความ การวิเคราะห์ และความรู้ต่างๆ"
keywords: "fintechxhub.com"
navIndex: "active"
---
<section class="py-5 bg-white">
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <div class="col-lg-12">
                <form id="searchForm">
                        <div class="text-center">
                                <input type="text" id="jobSearchInput" class="" placeholder="พิมพ์ชื่อตำแหน่งงาน หรือหน่วยงานที่ต้องการค้นหา..." style="">
                            </div>
                            <div class="text-center">
                                <button type="submit" class="">
                                    ค้นหางาน
                                </button>
                            </div>
                    </form>
                <div id="resultsContent">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h4 class="fw-bold mb-0">ประกาศงานล่าสุด</h4>
                        <span class="text-secondary small" id="jobCount">พบ 0 รายการ</span>
                    </div>
                    <div id="jobList" class="row g-4">
                        <div class="col-12 text-center py-5 text-muted">
                            <i class="bi bi-inbox fs-1 d-block mb-3"></i>
                            <p>กรุณากรอกชื่อตำแหน่งงานเพื่อเริ่มการค้นหา</p>
                        </div>
                    </div>
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
async function queryJobs(keyword) {
    try {
        // เรียก API โดยใช้ keyword
        const response = await fetch(`https://nodejsapix.vercel.app/api/load-scaping-a?url=https://jobapp.ocsc.go.th/jobapi/portal/jobs?query=${encodeURIComponent(keyword)}`);
        
        // ตรวจสอบสถานะการเชื่อมต่อ
        if (!response.ok) {
            throw new Error("ไม่สามารถเชื่อมต่อกับฐานข้อมูลงานราชการได้");
        }

        const data = await response.json();

        // ตรวจสอบว่ามีข้อมูลกลับมาหรือไม่ (data เป็น Array)
        if (Array.isArray(data)) {
            return data;
        } else {
            throw new Error("รูปแบบข้อมูลที่ได้รับไม่ถูกต้อง");
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        throw err;
    }
}
// เมื่อมีการกดปุ่มค้นหา
document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const keyword = document.getElementById('jobSearchInput').value;
    const jobList = document.getElementById('jobList');
    const jobCount = document.getElementById('jobCount');

    // แสดงสถานะกำลังโหลด
    jobList.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>';

    try {
        const jobs = await queryJobs(keyword);
        jobCount.innerText = `พบ ${jobs.length} รายการ`;

        if (jobs.length === 0) {
            jobList.innerHTML = '<div class="col-12 text-center py-5">ไม่พบข้อมูลงานที่คุณค้นหา</div>';
            return;
        }

        let html = '';
        jobs.forEach(job => {
            html += `
            <div class="col-12 mb-3">
                <div class="card border-0 shadow-sm rounded-4 p-3 border-start border-primary border-4">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2 text-center mb-3 mb-md-0">
                                <img src="${job.seal}" alt="หน่วยงาน" style="height: 60px; object-fit: contain;">
                            </div>
                            <div class="col-md-7">
                                <h5 class="fw-bold mb-1 text-dark">${job.position}</h5>
                                <p class="mb-1 text-primary small fw-medium">${job.department} | ${job.ministry}</p>
                                <div class="d-flex gap-2 text-muted small">
                                    <span><i class="bi bi-wallet2"></i> ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} บาท</span>
                                    <span><i class="bi bi-people"></i> ${job.positionAmount} อัตรา</span>
                                </div>
                            </div>
                            <div class="col-md-3 text-md-end">
                                <p class="text-danger small mb-2 fw-bold">ปิดรับสมัคร: ${job.applicationEndPrint}</p>
                                <a href="${job.url}" target="_blank" class="btn btn-primary rounded-pill btn-sm px-4">สมัครออนไลน์</a>
                                <a href="${job.fileName}" target="_blank" class="btn btn-outline-secondary rounded-pill btn-sm px-3 mt-1 mt-md-0">ประกาศ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        jobList.innerHTML = html;

    } catch (error) {
        jobList.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
});
// setTimeout(()=>{ document.getElementById('searchForm').submit(); },500);
</script>