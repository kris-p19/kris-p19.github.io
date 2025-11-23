(function ($) {
    // ชุดตัวอักษรพื้นฐาน
    const LOWER_CHARS = "abcdefghijklmnopqrstuvwxyz";
    const UPPER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const NUMBER_CHARS = "0123456789";
    const SYMBOL_CHARS = "!@#$%^&*()-_=+[]{};:,.?/|";

    const SIMILAR_CHARS = "0O1lI";
    const AMBIGUOUS_CHARS = "{}[]()/\\\\'\"`~,;:.<>";

    let showPassword = false;
    let historyList = []; // เก็บประวัติรหัสผ่าน

    function buildCharset(options) {
        let charset = "";
        if (options.useLower) charset += LOWER_CHARS;
        if (options.useUpper) charset += UPPER_CHARS;
        if (options.useNumbers) charset += NUMBER_CHARS;
        if (options.useSymbols) charset += SYMBOL_CHARS;

        if (options.avoidSimilar) {
            charset = charset.split("").filter(ch => !SIMILAR_CHARS.includes(ch)).join("");
        }
        if (options.avoidAmbiguous) {
            charset = charset.split("").filter(ch => !AMBIGUOUS_CHARS.includes(ch)).join("");
        }

        return charset;
    }

    function getActiveSets(options, charset) {
        // คืนชุดที่สามารถใช้ได้จริงตาม options + ตัวอักษรหลังกรอง
        const sets = [];
        if (options.useLower) {
            const s = LOWER_CHARS.split("").filter(ch => charset.includes(ch)).join("");
            if (s) sets.push(s);
        }
        if (options.useUpper) {
            const s = UPPER_CHARS.split("").filter(ch => charset.includes(ch)).join("");
            if (s) sets.push(s);
        }
        if (options.useNumbers) {
            const s = NUMBER_CHARS.split("").filter(ch => charset.includes(ch)).join("");
            if (s) sets.push(s);
        }
        if (options.useSymbols) {
            const s = SYMBOL_CHARS.split("").filter(ch => charset.includes(ch)).join("");
            if (s) sets.push(s);
        }
        return sets;
    }

    function generatePassword(length, options) {
        let charset = buildCharset(options);
        if (!charset) return "";

        // ถ้าบังคับให้มีแต่ละประเภท ต้องตรวจว่ามีชุดให้ใช้จริงก่อน
        const activeSets = getActiveSets(options, charset);
        if (options.requireEachType && activeSets.length === 0) {
            return "";
        }

        let passwordChars = [];

        // step 1: ใส่อย่างน้อย 1 ตัวจากแต่ละชุดที่เลือก
        if (options.requireEachType) {
            activeSets.forEach(set => {
                if (passwordChars.length < length) {
                    passwordChars.push(set[Math.floor(Math.random() * set.length)]);
                }
            });
        }

        // step 2: เติมส่วนที่เหลือจาก charset รวม
        while (passwordChars.length < length) {
            passwordChars.push(charset[Math.floor(Math.random() * charset.length)]);
        }

        // step 3: สุ่มสลับตำแหน่ง (Fisher-Yates)
        for (let i = passwordChars.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
        }

        return passwordChars.join("");
    }

    // ประเมินความแข็งแรงของรหัสผ่านแบบง่าย
    function evaluateStrength(password, options) {
        if (!password) return { score: 0, label: "-", hint: "สร้างรหัสผ่านเพื่อดูระดับความแข็งแรง" };

        let score = 0;
        const length = password.length;

        if (length >= 8) score += 10;
        if (length >= 12) score += 15;
        if (length >= 16) score += 15;

        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^a-zA-Z0-9]/.test(password);

        const varietyCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
        score += varietyCount * 15;

        // bonus ถ้าใช้ options ที่ดี
        if (options.avoidSimilar) score += 5;
        if (options.avoidAmbiguous) score += 5;
        if (options.requireEachType) score += 10;

        if (score > 100) score = 100;

        let label = "อ่อน";
        let hint = "รหัสผ่านนี้ค่อนข้างสั้นหรือหลากหลายไม่มาก แนะนำเพิ่มความยาวและประเภทตัวอักษร";
        if (score >= 35 && score < 65) {
            label = "ปานกลาง";
            hint = "พอใช้ได้สำหรับบัญชีทั่วๆ ไป แต่สำหรับบัญชีสำคัญควรเพิ่มความยาวและใช้สัญลักษณ์";
        } else if (score >= 65 && score < 85) {
            label = "แข็งแรง";
            hint = "เหมาะกับการใช้งานส่วนใหญ่แล้ว ควรเก็บในตัวจัดการรหัสผ่านแทนการจำ";
        } else if (score >= 85) {
            label = "แข็งแรงมาก";
            hint = "เหมาะสำหรับบัญชีสำคัญ เช่น อีเมลหลัก หรือบัญชีการเงิน";
        }

        return { score, label, hint };
    }

    function updateStrengthUI(password, options) {
        const { score, label, hint } = evaluateStrength(password, options);
        const $bar = $("#strengthBar");
        const $label = $("#strengthLabel");
        const $hint = $("#strengthHint");

        $bar.css("width", score + "%").attr("aria-valuenow", score);

        // reset class bootstrap
        $bar.removeClass("bg-success bg-warning bg-danger bg-info");
        $label.removeClass("bg-success bg-warning bg-danger bg-secondary bg-info");

        if (score === 0) {
            $bar.addClass("bg-secondary");
            $label.addClass("bg-secondary");
        } else if (score < 35) {
            $bar.addClass("bg-danger");
            $label.addClass("bg-danger");
        } else if (score < 65) {
            $bar.addClass("bg-warning");
            $label.addClass("bg-warning");
        } else if (score < 85) {
            $bar.addClass("bg-info");
            $label.addClass("bg-info");
        } else {
            $bar.addClass("bg-success");
            $label.addClass("bg-success");
        }

        $label.text(label);
        $hint.text(hint);
    }

    function renderHistory() {
        const $history = $("#passwordHistory");
        const $badge = $("#historyCountBadge");
        const $placeholder = $("#noHistoryPlaceholder");

        $history.empty();

        if (!historyList.length) {
            $badge.text("0 รายการ");
            $placeholder.removeClass("d-none");
            return;
        }

        $placeholder.addClass("d-none");
        $badge.text(historyList.length + " รายการ");

        historyList.forEach(function (item, index) {
            const display = showPassword ? item.password : "•".repeat(item.password.length);
            const html = `
                <div class="col">
                    <div class="border rounded-4 p-2 px-3 shadow-sm bg-white d-flex flex-column gap-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="small text-muted">#${index + 1}</div>
                            <button type="button"
                                    class="btn btn-xs btn-outline-secondary btnCopySingle rounded-pill"
                                    data-password="${item.password}">
                                คัดลอก
                            </button>
                        </div>
                        <div class="fw-semibold font-mono text-break">${display}</div>
                        <div class="text-muted small">
                            สร้างเมื่อ: ${item.time}
                        </div>
                    </div>
                </div>
            `;
            $history.append(html);
        });
    }

    function setCurrentPassword(password) {
        const $text = $("#currentPasswordText");
        const display = showPassword ? password : "•".repeat(password.length);
        $text.text(password ? display : "ยังไม่มีรหัสผ่าน");
    }

    function getOptions() {
        const length = parseInt($("#passwordLength").val(), 10) || 16;
        return {
            length: length,
            useLower: $("#useLower").is(":checked"),
            useUpper: $("#useUpper").is(":checked"),
            useNumbers: $("#useNumbers").is(":checked"),
            useSymbols: $("#useSymbols").is(":checked"),
            avoidSimilar: $("#avoidSimilar").is(":checked"),
            avoidAmbiguous: $("#avoidAmbiguous").is(":checked"),
            requireEachType: $("#requireEachType").is(":checked")
        };
    }

    function generateAndRender() {
        const opts = getOptions();

        // อย่างน้อยต้องเลือก 1 ประเภท
        if (!opts.useLower && !opts.useUpper && !opts.useNumbers && !opts.useSymbols) {
            alert("กรุณาเลือกอย่างน้อยหนึ่งประเภทของตัวอักษร");
            return;
        }

        const password = generatePassword(opts.length, opts);
        if (!password) {
            alert("ไม่สามารถสร้างรหัสผ่านได้จากเงื่อนไขปัจจุบัน กรุณาลองปรับตัวเลือกใหม่");
            return;
        }

        // เก็บประวัติ (เก็บสูงสุด 20 รายการ)
        const now = new Date();
        const timeStr = now.toLocaleString("th-TH");
        historyList.unshift({ password: password, time: timeStr });
        if (historyList.length > 20) {
            historyList = historyList.slice(0, 20);
        }

        setCurrentPassword(password);
        updateStrengthUI(password, opts);
        renderHistory();
    }

    $(function () {
        // sync label length
        $("#passwordLength").on("input change", function () {
            $("#passwordLengthValue").text($(this).val());
        });

        // ปุ่มหลัก
        $("#btnGenerate").on("click", function () {
            generateAndRender();
        });

        $("#btnGenerateQuick").on("click", function () {
            $("#passwordLength").val(16).trigger("change");
            $("#useLower, #useUpper, #useNumbers, #useSymbols").prop("checked", true);
            $("#avoidSimilar").prop("checked", true);
            $("#avoidAmbiguous").prop("checked", false);
            $("#requireEachType").prop("checked", true);
            generateAndRender();
        });

        $("#btnGenerateMax").on("click", function () {
            $("#passwordLength").val(32).trigger("change");
            $("#useLower, #useUpper, #useNumbers, #useSymbols").prop("checked", true);
            $("#avoidSimilar").prop("checked", true);
            $("#avoidAmbiguous").prop("checked", true);
            $("#requireEachType").prop("checked", true);
            generateAndRender();
        });

        // toggle แสดง / ซ่อน
        $("#btnShowToggle").on("click", function () {
            showPassword = !showPassword;
            if (historyList[0]) {
                setCurrentPassword(historyList[0].password);
            }
            renderHistory();
        });

        // คัดลอกรหัสผ่านปัจจุบัน
        $("#btnCopyCurrent").on("click", function () {
            if (!historyList[0]) {
                alert("ยังไม่มีรหัสผ่านให้คัดลอก");
                return;
            }
            const pwd = historyList[0].password;
            navigator.clipboard.writeText(pwd).then(function () {
                alert("คัดลอกรหัสผ่านปัจจุบันเรียบร้อยแล้ว");
            }).catch(function () {
                alert("เบราว์เซอร์ไม่รองรับการคัดลอกอัตโนมัติ กรุณาคัดลอกเอง");
            });
        });

        // คัดลอกประวัติทั้งชุด
        $("#btnCopyHistory").on("click", function () {
            if (!historyList.length) {
                alert("ยังไม่มีรหัสผ่านให้คัดลอก");
                return;
            }
            const all = historyList.map(item => item.password).join("\\n");
            navigator.clipboard.writeText(all).then(function () {
                alert("คัดลอกประวัติรหัสผ่านทั้งหมดเรียบร้อยแล้ว");
            }).catch(function () {
                alert("เบราว์เซอร์ไม่รองรับการคัดลอกอัตโนมัติ กรุณาคัดลอกเอง");
            });
        });

        // ปุ่มล้างประวัติ
        $("#btnClearHistory").on("click", function () {
            if (!confirm("ต้องการล้างประวัติรหัสผ่านทั้งหมดหรือไม่?")) return;
            historyList = [];
            setCurrentPassword("");
            updateStrengthUI("", {});
            renderHistory();
        });

        // คัดลอกทีละรายการ (delegation)
        $("#passwordHistory").on("click", ".btnCopySingle", function () {
            const pwd = $(this).data("password");
            navigator.clipboard.writeText(pwd).then(function () {
                alert("คัดลอกรหัสผ่านเรียบร้อยแล้ว");
            }).catch(function () {
                alert("เบราว์เซอร์ไม่รองรับการคัดลอกอัตโนมัติ กรุณาคัดลอกเอง");
            });
        });

        // initial render
        renderHistory();
    });
})(jQuery);