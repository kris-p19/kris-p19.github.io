(function ($) {
    let qrInstance = null;
    let logoObjectUrl = null;

    function getCorrectLevel(levelChar) {
        switch (levelChar) {
            case 'L': return QRCode.CorrectLevel.L;
            case 'M': return QRCode.CorrectLevel.M;
            case 'Q': return QRCode.CorrectLevel.Q;
            case 'H':
            default: return QRCode.CorrectLevel.H;
        }
    }

    // แปลงข้อมูลตามประเภทที่เลือก
    function buildQrText() {
        const type = $("#qrContentType").val();
        const raw = $("#qrText").val().trim();
        if (!raw) return "";

        switch (type) {
            case "url":
                if (/^https?:\/\//i.test(raw)) return raw;
                return "http://" + raw;

            case "tel":
                return "TEL:" + raw.replace(/\s+/g, "");

            case "sms": {
                const partsSms = raw.split(/[\|,]/);
                const phone = (partsSms[0] || "").trim();
                const msg = (partsSms[1] || "").trim();
                return "SMSTO:" + phone + ":" + msg;
            }

            case "email": {
                const partsMail = raw.split(/[\|,]/);
                const mail = (partsMail[0] || "").trim();
                const subject = encodeURIComponent((partsMail[1] || "").trim());
                const body = encodeURIComponent((partsMail[2] || "").trim());
                if (!subject && !body) {
                    return "mailto:" + mail;
                }
                return "mailto:" + mail + "?subject=" + subject + "&body=" + body;
            }

            case "wifi": {
                const partsWifi = raw.split(/[\|,]/);
                const ssid = (partsWifi[0] || "").trim();
                const pass = (partsWifi[1] || "").trim();
                const enc = (partsWifi[2] || "WPA").trim().toUpperCase();
                return `WIFI:T:${enc};S:${ssid};P:${pass};;`;
            }

            case "raw":
            default:
                return raw;
        }
    }

    function clearQr() {
        if (qrInstance) {
            $("#qrContainer").empty();
            qrInstance = null;
        }
    }

    function updateStats(size, hasLogo) {
        $("#qrStatSize").text(size ? size + " x " + size + " px" : "-");
        $("#qrStatLogo").text(hasLogo ? "ใช่" : "ไม่ใช้");
    }

    function generateQr() {
        const text = buildQrText();
        if (!text) {
            alert("กรุณากรอกข้อมูลสำหรับ QR Code ก่อน");
            return;
        }

        const size = parseInt($("#qrSize").val(), 10) || 256;
        const level = $("#qrLevel").val() || "H";
        const colorDark = $("#qrColorDark").val() || "#000000";
        const colorLight = $("#qrColorLight").val() || "#ffffff";
        const logoScale = parseFloat($("#qrLogoScale").val()) || 0.25;
        const logoTransparent = $("#qrLogoTransparent").is(":checked");
        const margin = parseInt($("#qrMargin").val(), 10) || 0;
        const dotStyle = $("#qrDotStyle").val();

        const hasLogo = !!logoObjectUrl;

        clearQr();

        const options = {
            text: text,
            width: size,
            height: size,
            colorDark: colorDark,
            colorLight: colorLight,
            correctLevel: getCorrectLevel(level),
            drawer: 'canvas',
            quietZone: margin
        };

        // ถ้าลิบรองรับจุดแบบ dot ให้ลองตั้งค่า dotScale
        if (dotStyle === "dot") {
            options.dotScale = 0.65;
        }

        if (hasLogo) {
            options.logo = logoObjectUrl;
            options.logoBackgroundTransparent = logoTransparent;
            options.logoWidth = size * logoScale;
            options.logoHeight = size * logoScale;
        }

        $("#qrEmptyHint").addClass("d-none");
        qrInstance = new QRCode(document.getElementById("qrContainer"), options);

        updateStats(size, hasLogo);
    }

    function handleLogoFileChange(file) {
        if (logoObjectUrl) {
            URL.revokeObjectURL(logoObjectUrl);
            logoObjectUrl = null;
        }
        if (!file) return;
        logoObjectUrl = URL.createObjectURL(file);
    }

    function downloadPng() {
        if (!qrInstance) {
            alert("ยังไม่มี QR Code ให้ดาวน์โหลด");
            return;
        }
        const canvas = $("#qrContainer").find("canvas")[0];
        if (!canvas) {
            alert("ไม่พบภาพ Canvas ของ QR Code");
            return;
        }

        try {
            const dataUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            const baseName = ($("#qrFileName").val().trim() || "qrcode").replace(/[^a-zA-Z0-9_\-]/g, "_");
            a.href = dataUrl;
            a.download = baseName + ".png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            console.error(e);
            alert("ไม่สามารถดาวน์โหลดภาพได้ (อาจติดปัญหา CORS จากโลโก้)");
        }
    }

    async function copyImageToClipboard() {
        if (!qrInstance) {
            alert("ยังไม่มี QR Code ให้คัดลอก");
            return;
        }
        const canvas = $("#qrContainer").find("canvas")[0];
        if (!canvas) {
            alert("ไม่พบภาพ Canvas ของ QR Code");
            return;
        }

        if (!navigator.clipboard || !navigator.clipboard.write) {
            alert("เบราว์เซอร์ไม่รองรับการคัดลอกรูปภาพอัตโนมัติ");
            return;
        }

        try {
            const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
            const item = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([item]);
            alert("คัดลอกรูปภาพ QR Code ไปยังคลิปบอร์ดเรียบร้อยแล้ว");
        } catch (e) {
            console.error(e);
            alert("ไม่สามารถคัดลอกรูปภาพได้ (เบราว์เซอร์บางตัวอาจยังไม่รองรับ)");
        }
    }

    $(function () {
        $("#qrLogoScale").on("input change", function () {
            $("#qrLogoScaleText").text($(this).val());
        });

        $("#qrLogoFile").on("change", function (e) {
            const file = e.target.files[0];
            handleLogoFileChange(file);
        });

        $("#btnQrGenerate").on("click", function () {
            generateQr();
        });

        $("#btnQrQuick").on("click", function () {
            if (!$("#qrText").val().trim()) {
                $("#qrContentType").val("url");
                $("#qrText").val("https://www.example.com/promo");
            }
            $("#qrSize").val(320);
            $("#qrColorDark").val("#000000");
            $("#qrColorLight").val("#ffffff");
            $("#qrLevel").val("H");
            $("#qrLogoScale").val(0.25).trigger("input");
            $("#qrMargin").val(10);
            generateQr();
        });

        $("#btnQrClear").on("click", function () {
            $("#qrContentType").val("raw");
            $("#qrText").val("");
            $("#qrSize").val(256);
            $("#qrColorDark").val("#000000");
            $("#qrColorLight").val("#ffffff");
            $("#qrLevel").val("H");
            $("#qrLogoScale").val(0.25).trigger("input");
            $("#qrLogoTransparent").prop("checked", true);
            $("#qrLogoFile").val("");
            $("#qrMargin").val(10);
            $("#qrDotStyle").val("square");
            $("#qrFileName").val("qrcode");

            if (logoObjectUrl) {
                URL.revokeObjectURL(logoObjectUrl);
                logoObjectUrl = null;
            }
            clearQr();
            $("#qrEmptyHint").removeClass("d-none");
            updateStats(null, false);
        });

        $("#btnQrDownload").on("click", function () {
            downloadPng();
        });

        $("#btnQrCopyImage").on("click", function () {
            copyImageToClipboard();
        });

        updateStats(null, false);
    });
})(jQuery);