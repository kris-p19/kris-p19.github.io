---
layout: default
title: "ราคาทองคำวันนี้ | ติดตามราคาทองคำเรียลไทม์ (ทองแท่ง/รูปพรรณ)"
description: "แพลตฟอร์มติดตามราคาทองคำแบบเรียลไทม์ อัปเดตราคาซื้อ-ขายทองคำแท่งและทองรูปพรรณ พร้อมสรุปแนวโน้ม กราฟราคา และเครื่องมือคำนวณน้ำหนักทอง ใช้งานง่าย ปลอดภัย บนระบบออนไลน์"
keywords: "ราคาทองคำ, ราคาทองวันนี้, ทองคำเรียลไทม์, ราคาทองแท่ง, ราคาทองรูปพรรณ, ซื้อขายทอง, กราฟราคาทอง, คำนวณทอง, ติดตามราคาทอง"
urlx: "https://fintechxhub.com/data/gold"
image: ""
---
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<header class="bg-amber-600 text-white text-center py-4 shadow-sm">
    <div class="mx-auto max-w-6xl px-4">
        <h1 class="text-xl md:text-2xl font-semibold">ทองคำ</h1>
        <p class="mt-1 text-sm md:text-base text-amber-50/90">
            ติดตามราคาทองคำแบบเรียลไทม์ • ราคาซื้อ-ขาย • ทองคำแท่ง • ทองรูปพรรณ
        </p>
    </div>
</header>
<main class="w-full mt-6">
    <div class="mx-auto max-w-6xl px-4 space-y-6">
        <!-- Hero / Summary -->
        <section class="rounded-2xl border bg-white shadow-sm p-5 md:p-6">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                <h2 class="text-lg md:text-xl font-semibold text-gray-900">
                    ราคาทองคำวันนี้ (อัปเดตล่าสุด: <span id="updatedAt">—</span>)
                </h2>
                <p class="mt-1 text-sm text-gray-600">
                    ดูราคา “ซื้อ/ขาย” แยกตามประเภททอง พร้อมสรุปการเปลี่ยนแปลงรายวัน เพื่อช่วยตัดสินใจซื้อขายได้ไวขึ้น
                </p>
                </div>
                <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-sm">
                    <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    เรียลไทม์
                </span>
                <button id="refreshBtn"
                    class="rounded-xl bg-amber-600 text-white px-4 py-2 text-sm font-medium hover:bg-amber-700 active:scale-[0.99]">
                    รีเฟรชราคา
                </button>
                </div>
            </div>
            <!-- Price Cards -->
            <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="rounded-2xl border p-5">
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-gray-900">ทองคำแท่ง</h3>
                        <span class="text-xs rounded-full bg-gray-100 text-gray-700 px-2 py-1">บาททองคำ</span>
                    </div>
                    <div class="mt-4 grid grid-cols-2 gap-3">
                        <div class="rounded-xl bg-gray-50 p-4">
                            <p class="text-xs text-gray-500">ราคารับซื้อ</p>
                            <p id="barBuy" class="mt-1 text-2xl font-semibold text-gray-900">—</p>
                        </div>
                        <div class="rounded-xl bg-gray-50 p-4">
                            <p class="text-xs text-gray-500">ราคาขายออก</p>
                            <p id="barSell" class="mt-1 text-2xl font-semibold text-gray-900">—</p>
                        </div>
                    </div>
                    <p id="barChange" class="mt-3 text-sm text-gray-600">เปลี่ยนแปลง: —</p>
                </div>
                <div class="rounded-2xl border p-5">
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-gray-900">ทองรูปพรรณ</h3>
                        <span class="text-xs rounded-full bg-gray-100 text-gray-700 px-2 py-1">บาททองคำ</span>
                    </div>
                    <div class="mt-4 grid grid-cols-2 gap-3">
                        <div class="rounded-xl bg-gray-50 p-4">
                            <p class="text-xs text-gray-500">ราคารับซื้อ</p>
                            <p id="ornBuy" class="mt-1 text-2xl font-semibold text-gray-900">—</p>
                        </div>
                        <div class="rounded-xl bg-gray-50 p-4">
                            <p class="text-xs text-gray-500">ราคาขายออก</p>
                            <p id="ornSell" class="mt-1 text-2xl font-semibold text-gray-900">—</p>
                        </div>
                    </div>
                    <p id="ornChange" class="mt-3 text-sm text-gray-600">เปลี่ยนแปลง: —</p>
                </div>
            </div>
            <div class="mt-4 text-xs text-gray-500">
                หมายเหตุ: ราคาทองอาจเปลี่ยนแปลงระหว่างวัน โปรดตรวจสอบก่อนทำรายการซื้อขายทุกครั้ง
            </div>
        </section>
        <!-- Tools -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="lg:col-span-2 rounded-2xl border bg-white shadow-sm p-5 md:p-6">
                <h2 class="text-lg font-semibold text-gray-900">กราฟแนวโน้มราคา</h2>
                <p class="mt-1 text-sm text-gray-600">
                    แสดงแนวโน้มเพื่อช่วยให้เห็นทิศทางราคา (ตัวอย่าง UI — เชื่อมข้อมูลจริงได้ภายหลัง)
                </p>
                <div class="mt-5 rounded-2xl bg-gradient-to-b from-amber-50 to-white border p-4 md:p-6">
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-800">ช่วงเวลา</p>
                        <div class="flex gap-2">
                        <button class="px-3 py-1.5 text-sm rounded-xl border hover:bg-white">1D</button>
                        <button class="px-3 py-1.5 text-sm rounded-xl border hover:bg-white">1W</button>
                        <button class="px-3 py-1.5 text-sm rounded-xl border bg-white">1M</button>
                        <button class="px-3 py-1.5 text-sm rounded-xl border hover:bg-white">1Y</button>
                        </div>
                    </div>
                    <div class="mt-4 h-48 rounded-xl bg-white border grid place-items-center text-sm text-gray-500">
                        พื้นที่กราฟ (Chart Placeholder)
                    </div>
                </div>
            </div>
            <div class="rounded-2xl border bg-white shadow-sm p-5 md:p-6">
                <h2 class="text-lg font-semibold text-gray-900">คำนวณราคาทอง</h2>
                <p class="mt-1 text-sm text-gray-600">คำนวณคร่าว ๆ ตามน้ำหนักที่ต้องการ</p>
                <div class="mt-4 space-y-3">
                    <label class="block text-sm font-medium text-gray-800">เลือกประเภท</label>
                    <select id="typeSelect" class="w-full rounded-xl border px-3 py-2 text-sm">
                        <option value="bar">ทองคำแท่ง (ขายออก)</option>
                        <option value="orn">ทองรูปพรรณ (ขายออก)</option>
                    </select>
                    <label class="block text-sm font-medium text-gray-800">น้ำหนัก (บาททองคำ)</label>
                    <input id="weightInput" type="number" min="0" step="0.01" placeholder="เช่น 1, 2, 0.50"
                        class="w-full rounded-xl border px-3 py-2 text-sm" />
                    <button id="calcBtn"
                        class="w-full rounded-xl bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black">
                        คำนวณ
                    </button>
                    <div class="rounded-xl bg-gray-50 border p-4">
                        <p class="text-xs text-gray-500">ประมาณการราคา</p>
                        <p id="calcResult" class="mt-1 text-xl font-semibold text-gray-900">—</p>
                    </div>
                </div>
            </div>
        </section>
        <!-- Content / Copywriting (รูปประพันธ์/คำโปรย) -->
        <section class="rounded-2xl border bg-white shadow-sm p-5 md:p-6">
            <h2 class="text-lg font-semibold text-gray-900">คำโปรย</h2>
            <div class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div class="rounded-2xl border p-4 bg-white">
                    <p class="font-medium text-gray-900">ดูราคาไว</p>
                    <p class="mt-1 text-gray-600">อัปเดตเรียลไทม์ แยกราคาซื้อ-ขายชัดเจน ไม่ต้องเดา</p>
                </div>
                <div class="rounded-2xl border p-4 bg-white">
                    <p class="font-medium text-gray-900">ตัดสินใจง่าย</p>
                    <p class="mt-1 text-gray-600">สรุปการเปลี่ยนแปลงรายวัน + แนวโน้มราคาในมุมเดียว</p>
                </div>
                <div class="rounded-2xl border p-4 bg-white">
                    <p class="font-medium text-gray-900">พร้อมซื้อขาย</p>
                    <p class="mt-1 text-gray-600">รองรับทั้งทองแท่งและทองรูปพรรณ พร้อมเครื่องมือคำนวณ</p>
                </div>
            </div>
        </section>
    </div>
</main>
<script>
    // ====== Demo-only script (replace with real API later) ======
    const fmt = (n) => (typeof n === "number"
        ? n.toLocaleString("th-TH", { maximumFractionDigits: 2 })
        : "—");
    function setUpdatedNow() {
        const d = new Date();
        document.getElementById("updatedAt").textContent =
        d.toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" });
    }
    // Mock data
    let data = {
        bar: { buy: 0, sell: 0, change: 0 },
        orn: { buy: 0, sell: 0, change: 0 }
    };
    function mockFetch() {
        // สุ่มตัวเลขเพื่อโชว์หน้าตา UI
        const base = 42000 + Math.floor(Math.random() * 800);
        const delta = (Math.random() > 0.5 ? 1 : -1) * (10 + Math.floor(Math.random() * 90));
        data.bar.buy = base - 150;
        data.bar.sell = base;
        data.bar.change = delta;
        data.orn.buy = base - 650;
        data.orn.sell = base + 50;
        data.orn.change = delta;
        render();
        setUpdatedNow();
    }
    function render() {
        document.getElementById("barBuy").textContent = fmt(data.bar.buy);
        document.getElementById("barSell").textContent = fmt(data.bar.sell);
        document.getElementById("ornBuy").textContent = fmt(data.orn.buy);
        document.getElementById("ornSell").textContent = fmt(data.orn.sell);
        const barChangeEl = document.getElementById("barChange");
        const ornChangeEl = document.getElementById("ornChange");
        const barText = data.bar.change >= 0 ? `+${fmt(data.bar.change)}` : `${fmt(data.bar.change)}`;
        const ornText = data.orn.change >= 0 ? `+${fmt(data.orn.change)}` : `${fmt(data.orn.change)}`;
        barChangeEl.textContent = `เปลี่ยนแปลง: ${barText}`;
        ornChangeEl.textContent = `เปลี่ยนแปลง: ${ornText}`;
        barChangeEl.className = "mt-3 text-sm " + (data.bar.change >= 0 ? "text-emerald-700" : "text-rose-700");
        ornChangeEl.className = "mt-3 text-sm " + (data.orn.change >= 0 ? "text-emerald-700" : "text-rose-700");
    }
    document.getElementById("refreshBtn").addEventListener("click", mockFetch);
    document.getElementById("calcBtn").addEventListener("click", () => {
        const t = document.getElementById("typeSelect").value;
        const w = parseFloat(document.getElementById("weightInput").value || "0");
        const price = (t === "bar" ? data.bar.sell : data.orn.sell);
        const total = w > 0 && price > 0 ? w * price : 0;
        document.getElementById("calcResult").textContent =
        total > 0 ? `${fmt(total)} บาท` : "—";
    });
    // initial load
    mockFetch();
</script>