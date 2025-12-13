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
        <section class="rounded-2xl border bg-white shadow-sm p-5 md:p-6">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h2 class="text-lg md:text-xl font-semibold text-gray-900">
                        ราคาทองคำวันนี้ (อัปเดตล่าสุด: <span id="updatedAt">—</span>)
                    </h2>
                    <p class="mt-1 text-sm text-gray-600">
                        ดูราคา “ซื้อ/ขาย” แยกตามประเภททอง พร้อมสรุปการเปลี่ยนแปลงรายวัน
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
            <div id="statusNote" class="mt-4 text-xs text-gray-500">
                แหล่งข้อมูล: thaigold.info (RealTimeDataV2)
            </div>
        </section>
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="lg:col-span-2 rounded-2xl border bg-white shadow-sm p-5 md:p-6">
                <h2 class="text-lg font-semibold text-gray-900">กราฟแนวโน้มราคา</h2>
                <p class="mt-1 text-sm text-gray-600">
                    (พื้นที่กราฟ — ถ้าต้องการ ผมทำให้ plot จากข้อมูลที่เก็บเป็น time series ได้)
                </p>
                <div class="mt-5 rounded-2xl bg-gradient-to-b from-amber-50 to-white border p-4 md:p-6">
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
    </div>
</main>
<script>
    // ========= Config =========
    // ถ้า CORS ไม่ให้ยิงตรง ๆ ให้เปลี่ยนเป็น proxy ของคุณ เช่น "/api/gold"
    const GOLD_URL = "https://www.thaigold.info/RealTimeDataV2/gtdata_.txt";
    const REFRESH_MS = 15000; // 15s

    // ========= Helpers =========
    const fmt = (n) => (typeof n === "number"
        ? n.toLocaleString("th-TH", { maximumFractionDigits: 2 })
        : "—");

    const toNumber = (v) => {
        if (v === null || v === undefined) return null;
        if (typeof v === "number") return Number.isFinite(v) ? v : null;
        // handle strings like "31.56", "+0.0", "-150"
        const s = String(v).trim().replace(/,/g, "");
        if (!s) return null;
        const x = Number(s);
        return Number.isFinite(x) ? x : null;
    };

    function setUpdated(text) {
        document.getElementById("updatedAt").textContent = text || "—";
    }

    function setStatus(msg, isError = false) {
        const el = document.getElementById("statusNote");
        el.textContent = msg;
        el.className = "mt-4 text-xs " + (isError ? "text-rose-700" : "text-gray-500");
    }

    // ========= State =========
    // จะพยายาม map จากชื่อในไฟล์:
    // - "สมาคมฯ" = ทองคำแท่ง
    // - "96.5%" = ทองรูปพรรณ
    const state = {
        bar: { buy: null, sell: null, change: null },
        orn: { buy: null, sell: null, change: null }
    };

    function applyChangeClass(el, change) {
        const base = "mt-3 text-sm ";
        if (typeof change !== "number") {
        el.className = base + "text-gray-600";
        return;
        }
        el.className = base + (change >= 0 ? "text-emerald-700" : "text-rose-700");
    }

    function render() {
        document.getElementById("barBuy").textContent = fmt(state.bar.buy);
        document.getElementById("barSell").textContent = fmt(state.bar.sell);
        document.getElementById("ornBuy").textContent = fmt(state.orn.buy);
        document.getElementById("ornSell").textContent = fmt(state.orn.sell);

        const barChangeEl = document.getElementById("barChange");
        const ornChangeEl = document.getElementById("ornChange");

        const barCh = state.bar.change;
        const ornCh = state.orn.change;

        const barText = (typeof barCh === "number")
        ? (barCh >= 0 ? `+${fmt(barCh)}` : `${fmt(barCh)}`)
        : "—";
        const ornText = (typeof ornCh === "number")
        ? (ornCh >= 0 ? `+${fmt(ornCh)}` : `${fmt(ornCh)}`)
        : "—";

        barChangeEl.textContent = `เปลี่ยนแปลง: ${barText}`;
        ornChangeEl.textContent = `เปลี่ยนแปลง: ${ornText}`;

        applyChangeClass(barChangeEl, barCh);
        applyChangeClass(ornChangeEl, ornCh);
    }

    // ========= Fetch + Parse =========
    function indexByName(arr) {
        const map = new Map();
        for (const it of arr) {
        if (it && typeof it.name === "string") map.set(it.name, it);
        }
        return map;
    }

    async function fetchGold() {
        try {
        setStatus("กำลังดึงข้อมูลล่าสุด…");
        const res = await fetch(GOLD_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();

        // บางครั้งปลายทางอาจส่งเป็น text ที่เป็น JSON อยู่แล้ว
        const arr = JSON.parse(text);
        if (!Array.isArray(arr)) throw new Error("Invalid data: not an array");

        const m = indexByName(arr);

        // Update time: ในไฟล์มี item ชื่อ "Update" และ ask เป็นเวลา เช่น "13:15"
        const upd = m.get("Update");
        const updatedAt = upd?.ask ? String(upd.ask) : null;
        setUpdated(updatedAt || new Date().toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" }));

        // ทองคำแท่ง: "สมาคมฯ"
        const bar = m.get("สมาคมฯ") || m.get("\u0e2a\u0e21\u0e32\u0e04\u0e21\u0e2f");
        state.bar.buy = toNumber(bar?.bid);
        state.bar.sell = toNumber(bar?.ask);
        state.bar.change = toNumber(bar?.diff);

        // ทองรูปพรรณ: "96.5%"
        const orn = m.get("96.5%");
        state.orn.buy = toNumber(orn?.bid);
        state.orn.sell = toNumber(orn?.ask);
        state.orn.change = toNumber(orn?.diff);

        render();
        setStatus("แหล่งข้อมูล: thaigold.info (RealTimeDataV2) • อัปเดตสำเร็จ");
        } catch (err) {
        console.error(err);
        setStatus(
            "ดึงข้อมูลไม่สำเร็จ (อาจถูก CORS หรือปลายทางไม่พร้อม) — แนะนำทำ proxy เช่น /api/gold แล้วเปลี่ยน GOLD_URL",
            true
        );
        // ไม่ทับค่าที่มีอยู่เดิม เพื่อให้หน้าไม่ว่าง
        }
    }

    // ========= Calculator =========
    document.getElementById("calcBtn").addEventListener("click", () => {
        const t = document.getElementById("typeSelect").value;
        const w = parseFloat(document.getElementById("weightInput").value || "0");
        const price = (t === "bar" ? state.bar.sell : state.orn.sell);
        const total = w > 0 && typeof price === "number" ? w * price : 0;
        document.getElementById("calcResult").textContent = total > 0 ? `${fmt(total)} บาท` : "—";
    });

    document.getElementById("refreshBtn").addEventListener("click", fetchGold);

    // ========= Auto refresh =========
    fetchGold();
    setInterval(fetchGold, REFRESH_MS);
</script>