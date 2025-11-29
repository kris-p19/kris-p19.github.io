---
layout: default
title: "ข้อมูลการเชื่อมต่ออินเทอร์เน็ตของฉัน"
description: "หน้าเว็บสำหรับตรวจสอบข้อมูลการเชื่อมต่ออินเทอร์เน็ตของผู้ใช้แบบเรียลไทม์ รวมถึงประเภทการเชื่อมต่อ ความเร็วโดยประมาณ Public IP รายละเอียด ISP และตำแหน่งพิกัดคร่าว ๆ จากข้อมูล IP พร้อมแผนที่แบบอินเทอร์แอคทีฟโดยใช้ Leaflet และ OpenStreetMap"
keyworkd: "ตรวจสอบอินเทอร์เน็ต, connection info, network information API, public IP, IP location, พิกัด IP, แผนที่ IP, แผนที่ออนไลน์, Leaflet, OpenStreetMap, ความเร็วอินเทอร์เน็ต, ประเภทการเชื่อมต่อ, ISP, ตรวจสอบ IP, ipapi, ipify"
---

<head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  />

  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      max-width: 900px;
      margin: 40px auto;
      padding: 0 16px;
      line-height: 1.6;
    }
    h1, h2 {
      margin-bottom: 0.3em;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    pre {
      background: #f7f7f7;
      padding: 10px;
      border-radius: 6px;
      overflow-x: auto;
    }
    .error {
      color: #c00;
      font-weight: bold;
    }
    button {
      padding: 8px 14px;
      border-radius: 6px;
      border: 1px solid #ccc;
      cursor: pointer;
      font-size: 14px;
      margin-top: 8px;
    }
    #map {
      width: 100%;
      height: 350px;
      border-radius: 8px;
      margin-top: 10px;
      border: 1px solid #ddd;
    }
    small {
      color: #555;
    }
  </style>
</head>
<body>
  <h1>ข้อมูลการเชื่อมต่ออินเทอร์เน็ตของคุณ</h1>
  <p>
    หน้านี้จะแสดงข้อมูลเน็ตของคุณเท่าที่เบราว์เซอร์อนุญาตให้ดูได้<br>
    รวมถึงตำแหน่ง <b>คร่าว ๆ</b> บนแผนที่จากข้อมูล IP (ไม่ใช่ GPS)
  </p>

  <!-- การเชื่อมต่อจาก Network Information API -->
  <div class="card">
    <h2>1. ข้อมูลการเชื่อมต่อ (Network Information API)</h2>
    <p id="conn-support"></p>
    <pre id="conn-info"></pre>
  </div>

  <!-- Public IP -->
  <div class="card">
    <h2>2. Public IP</h2>
    <p>ดึงจากบริการตัวอย่าง <code>api.ipify.org</code></p>
    <pre id="ip-info"></pre>
    <p id="ip-error" class="error"></p>
  </div>

  <!-- รายละเอียด IP (ประเทศ / เมือง / ISP ฯลฯ) + แผนที่ -->
  <div class="card">
    <h2>3. รายละเอียด IP + แผนที่ (คร่าว ๆ)</h2>
    <p>
      ดึงจากบริการตัวอย่าง <code>ipapi.co</code> (ฟรี มีลิมิต)<br>
      <small>พิกัดเป็นการเดาจาก IP อาจไม่ตรงตำแหน่งจริงเป๊ะ ๆ</small>
    </p>
    <button id="load-ip-details">โหลดรายละเอียด IP และแสดงแผนที่</button>
    <pre id="ip-details"></pre>
    <p id="ip-details-error" class="error"></p>
    <div id="map"></div>
  </div>

  <!-- Leaflet JS (สำหรับแผนที่) -->
  <script
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""
  ></script>

  <script>
    // =========================
    // 1) ข้อมูลการเชื่อมต่อ
    // =========================
    function showConnectionInfo() {
      const supportEl = document.getElementById('conn-support');
      const infoEl = document.getElementById('conn-info');

      if (!('connection' in navigator)) {
        supportEl.textContent = 'เบราว์เซอร์นี้ไม่รองรับ Network Information API';
        infoEl.textContent = '';
        return;
      }

      supportEl.textContent = 'เบราว์เซอร์นี้รองรับ Network Information API ✅';

      const c = navigator.connection;

      const data = {
        effectiveType: c.effectiveType, // 4g / 3g / 2g / slow-2g
        downlink: c.downlink,          // Mbps โดยประมาณ
        rtt: c.rtt,                    // ms โดยประมาณ
        saveData: c.saveData,          // เปิดโหมดประหยัดดาต้าหรือไม่
        type: c.type || 'unknown'      // บางเบราว์เซอร์อาจมี type เช่น wifi, cellular
      };

      infoEl.textContent = JSON.stringify(data, null, 2);
    }

    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', showConnectionInfo);
    }

    // =========================
    // 2) ดึง Public IP
    // =========================
    async function getPublicIP() {
      const ipEl = document.getElementById('ip-info');
      const errEl = document.getElementById('ip-error');
      ipEl.textContent = 'กำลังดึง IP...';
      errEl.textContent = '';

      try {
        const res = await fetch('https://api.ipify.org?format=json');
        if (!res.ok) throw new Error('HTTP status ' + res.status);
        const data = await res.json();
        ipEl.textContent = JSON.stringify(data, null, 2);
        return data.ip;
      } catch (e) {
        ipEl.textContent = '';
        errEl.textContent = 'ดึง IP ไม่ได้: ' + e.message;
        return null;
      }
    }

    // =========================
    // 3) รายละเอียด IP + แผนที่
    // =========================
    let map;         // ตัวแปรเก็บ instance ของแผนที่
    let marker;      // ตัวแปรเก็บ marker
    let circle;      // ตัวแปรเก็บวงกลมคร่าว ๆ รอบตำแหน่ง

    function initOrUpdateMap(lat, lon) {
      if (!lat || !lon) return;

      const zoomLevel = 10; // ซูมไม่เยอะมาก ให้เห็นเป็นโซนกว้าง ๆ

      if (!map) {
        // สร้างแผนที่ครั้งแรก
        map = L.map('map').setView([lat, lon], zoomLevel);

        // ใช้แผนที่จาก OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
      } else {
        // ถ้ามีอยู่แล้ว เลื่อนมาที่ตำแหน่งใหม่
        map.setView([lat, lon], zoomLevel);
      }

      // ลบ marker กับ circle เก่าถ้ามี
      if (marker) {
        map.removeLayer(marker);
      }
      if (circle) {
        map.removeLayer(circle);
      }

      // เพิ่ม marker ที่ตำแหน่งคร่าว ๆ
      marker = L.marker([lat, lon]).addTo(map);
      marker.bindPopup('ตำแหน่งประมาณจาก IP').openPopup();

      // วาดวงกลมรัศมีคร่าว ๆ (เช่น 10km) เพื่อบอกว่าไม่แม่นยำมาก
      circle = L.circle([lat, lon], {
        radius: 10000 // เมตร
      }).addTo(map);
    }

    async function getIPDetails() {
      const btn = document.getElementById('load-ip-details');
      const detailsEl = document.getElementById('ip-details');
      const errEl = document.getElementById('ip-details-error');

      btn.disabled = true;
      btn.textContent = 'กำลังโหลด...';
      detailsEl.textContent = '';
      errEl.textContent = '';

      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error('HTTP status ' + res.status);
        const data = await res.json();

        const picked = {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          postal: data.postal,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
          org: data.org, // ISP / องค์กร
          asn: data.asn
        };

        detailsEl.textContent = JSON.stringify(picked, null, 2);

        // ถ้ามีพิกัด ให้ไปแสดงบนแผนที่
        if (data.latitude && data.longitude) {
          initOrUpdateMap(data.latitude, data.longitude);
        } else {
          errEl.textContent = 'ไม่มีข้อมูลพิกัดจาก IP (latitude/longitude ว่าง)';
        }
      } catch (e) {
        errEl.textContent = 'ดึงข้อมูลรายละเอียด IP ไม่ได้: ' + e.message;
      } finally {
        btn.disabled = false;
        btn.textContent = 'โหลดรายละเอียด IP และแสดงแผนที่';
      }
    }

    document.getElementById('load-ip-details')
      .addEventListener('click', getIPDetails);

    // เรียกใช้ตอนโหลดหน้า
    showConnectionInfo();
    getPublicIP();
  </script>
</body>