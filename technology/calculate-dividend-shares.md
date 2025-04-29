---
layout: default
title: "คำนวณหุ้นปันผล"
description: "คำนวณหุ้นปันผล Stock Market"
keywords: "คำนวณหุ้นปันผล,Stock Market"
urlx: "https://fintechxhub.com/technology/calculate-dividend-shares"
image: "https://s6.imgcdn.dev/YwB7uN.jpg"
navTechnology: "active"
---
<div class="col-md-6 offset-md-3">
    <div class="tags-widget widget-item">
        <h3 class="widget-title">คำนวณหุ้นปันผล</h3>
        <article>
            <div class="mb-3 row">
                <label for="input1" class="col-sm-4 col-form-label">จำนวนเงินลงทุน</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="input1">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="input2" class="col-sm-4 col-form-label">ราคาต่อหุ้น</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="input2">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="input3" class="col-sm-4 col-form-label">จำนวนหุ้นที่ซื้อได้</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control bg-secondary-subtle" id="input3" readonly>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="input4" class="col-sm-4 col-form-label">เงินปันผลต่อหุ้น</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="input4">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="input5" class="col-sm-4 col-form-label">อัตราภาษีหัก ณ ที่จ่าย (10%)</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control bg-secondary-subtle" id="input5" readonly value="10">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="input6" class="col-sm-4 col-form-label">ภาษีที่ถูกหัก</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control bg-secondary-subtle" id="input6" readonly>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="input7" class="col-sm-4 col-form-label">เงินปันผลสุทธิที่ได้รับ</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control bg-secondary-subtle" id="input7" readonly>
                </div>
            </div>
        </article>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const input1 = document.getElementById('input1'); // เงินลงทุน
        const input2 = document.getElementById('input2'); // ราคาต่อหุ้น
        const input3 = document.getElementById('input3'); // จำนวนหุ้นที่ซื้อได้ (คำนวณ)
        const input4 = document.getElementById('input4'); // เงินปันผลต่อหุ้น
        const input5 = document.getElementById('input5'); // อัตราภาษี
        const input6 = document.getElementById('input6'); // ภาษีที่ถูกหัก (คำนวณ)
        const input7 = document.getElementById('input7'); // ปันผลสุทธิที่ได้รับ (คำนวณ)
        function calculateDividend() {
            const investment = parseFloat(input1.value) || 0;
            const pricePerShare = parseFloat(input2.value) || 0;
            const dividendPerShare = parseFloat(input4.value) || 0;
            const taxRate = parseFloat(input5.value) || 0;
            if (pricePerShare <= 0) return;
            // จำนวนหุ้นที่ซื้อได้
            const shares = Math.floor(investment / pricePerShare);
            input3.value = shares;
            // เงินปันผลรวม
            const grossDividend = shares * dividendPerShare;
            // ภาษีที่ถูกหัก
            const tax = grossDividend * (taxRate / 100);
            input6.value = tax.toFixed(2);
            // เงินปันผลสุทธิ
            const netDividend = grossDividend - tax;
            input7.value = netDividend.toFixed(2);
        }
        // คำนวณเมื่อมีการเปลี่ยนค่า
        input1.addEventListener('input', calculateDividend);
        input2.addEventListener('input', calculateDividend);
        input4.addEventListener('input', calculateDividend);
    });
</script>