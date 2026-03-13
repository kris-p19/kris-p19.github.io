---
layout: default
title: "หน้าแรก"
description: "ข่าวสาร บทความ การวิเคราะห์ และความรู้ต่างๆ"
keywords: "fintechxhub.com"
navIndex: "active"
---
<section class="py-10 bg-white">
  <div class="container">
    <div class="row align-items-center justify-content-between g-5">
      <div class="col-lg-6">
        <div class="p-2 bg-light rounded-5 shadow-sm">
           <img id="picsum-img" src="https://picsum.photos/800/500" class="img-fluid rounded-5 shadow-sm" alt="Product View">
        </div>
      </div>
      <div class="col-lg-5">
        <h6 class="text-primary fw-bold text-uppercase mb-3" style="letter-spacing: 1px;">Productivity</h6>
        <h2 class="display-5 fw-medium mb-4" style="color: #202124;">จัดการงานของคุณ <br>ให้เป็นเรื่องง่าย</h2>
        <p class="fs-5 text-secondary mb-5" style="line-height: 1.6;">
          ออกแบบมาเพื่อช่วยให้คุณโฟกัสกับสิ่งที่สำคัญที่สุด ด้วยเครื่องมือที่ชาญฉลาดและเข้าถึงได้จากทุกที่
        </p>
        <div class="d-flex gap-3">
          <a href="javascript:void(0);" class="randomimg btn btn-primary rounded-pill px-4 py-2 fw-medium shadow-none">เริ่มต้นใช้งาน</a>
          <a href="javascript:void(0);" class="randomimg btn btn-outline-secondary rounded-pill px-4 py-2 fw-medium border-1 shadow-none">เรียนรู้เพิ่มเติม</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5 bg-light">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm rounded-4 p-3 transition-hover" style="transition: transform 0.2s;">
          <div class="card-body">
            <div class="mb-4">
               <i class="bi bi-cloud-check text-success fs-1"></i>
            </div>
            <h5 class="card-title fw-bold mb-3">ปลอดภัยทุกที่</h5>
            <p class="card-text text-muted">เข้าถึงข้อมูลของคุณได้อย่างปลอดภัยด้วยระบบการยืนยันตัวตนหลายชั้นที่เป็นมาตรฐานสากล</p>
            <a href="/" class="text-primary text-decoration-none fw-medium mt-3 d-inline-block">ดูรายละเอียด <i class="bi bi-arrow-right ms-1"></i></a>
          </div>
        </div>
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
    $('.randomimg').on('click',()=>{
        window.location.href = '/';
    });
</script>
<!-- /Category Section Section -->