(function ($) {
    // ตัวแปรสถานะ
    let currentFile = null;
    let currentObjectUrl = null;
    let pdfWorker = null;
    let workerReady = false;

    // สร้าง / โหลด Web Worker ถ้าเปิดโหมด worker
    function initWorkerIfNeeded() {
        const useWorker = $("#optUseWorker").is(":checked");
        if (!useWorker) return;

        if (pdfWorker) return; // สร้างแล้ว

        setStatus("กำลังโหลดไลบรารีสำหรับแปลงไฟล์...", "info", 15);

        // ใช้ไฟล์ Aspose เดียวกันเป็น worker โดยโหลดผ่าน CDN
        pdfWorker = new Worker("https://cdn.jsdelivr.net/npm/aspose-pdf-js@25.10.0/AsposePDFforJS.js");
        pdfWorker.onerror = function (evt) {
            console.error("Error from Web Worker:", evt.message);
            setStatus("เกิดข้อผิดพลาดจาก Web Worker: " + evt.message, "danger", 0);
        };
        pdfWorker.onmessage = function (evt) {
            if (evt.data === "ready") {
                workerReady = true;
                setStatus("ไลบรารีพร้อมใช้งานแล้ว สามารถแปลงไฟล์ได้ทันที", "success", 25);
                return;
            }

            if (!evt.data || !evt.data.json) {
                setStatus("รูปแบบข้อมูลตอบกลับจาก Worker ไม่ถูกต้อง", "danger", 0);
                return;
            }

            const json = evt.data.json;
            const params = evt.data.params || [];
            if (json.errorCode === 0) {
                // ในตัวอย่าง Aspose ใช้ params[0] เป็นข้อมูลไฟล์ผลลัพธ์ที่ Worker ส่งกลับมา
                // เราจะนำไปสร้าง Blob เพื่อให้ผู้ใช้ดาวน์โหลด
                const content = params[0];
                const outName = json.fileNameResult || "Result.docx";
                const mime = (json.fileNameResult && json.fileNameResult.toLowerCase().endsWith(".doc"))
                    ? "application/msword"
                    : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

                createDownloadFromBytes(outName, mime, content);
                setStatus("แปลงไฟล์สำเร็จ สามารถดาวน์โหลดได้แล้ว", "success", 100);
            } else {
                setStatus("เกิดข้อผิดพลาดในการแปลงไฟล์: " + json.errorText, "danger", 0);
            }
        };
    }

    // ตั้งข้อความสถานะ + สี badge + แถบ progress
    function setStatus(text, type, progress) {
        const $badge = $("#statusBadge");
        const $bar = $("#statusProgressBar");

        $("#statusText").text(text || "");

        $badge.removeClass("bg-secondary bg-info bg-success bg-danger bg-warning");
        $bar.removeClass("bg-secondary bg-info bg-success bg-danger bg-warning");

        let cls = "bg-secondary";
        if (type === "info") cls = "bg-info";
        else if (type === "success") cls = "bg-success";
        else if (type === "danger") cls = "bg-danger";
        else if (type === "warning") cls = "bg-warning";

        $badge.addClass(cls);
        $bar.addClass(cls);

        if (typeof progress === "number") {
            if (progress < 0) progress = 0;
            if (progress > 100) progress = 100;
            $bar.css("width", progress + "%").attr("aria-valuenow", progress);
        }
    }

    // แสดงข้อมูลไฟล์ที่เลือก
    function showFileInfo(file) {
        if (!file) {
            $("#pdfFileInfo").addClass("d-none");
            $("#statInputSize").text("-");
            return;
        }
        $("#pdfFileInfo").removeClass("d-none");
        $("#pdfFileNameText").text(file.name);
        $("#pdfFileSizeText").text(formatBytes(file.size));
        $("#statInputSize").text(formatBytes(file.size));
    }

    function formatBytes(bytes) {
        if (!bytes && bytes !== 0) return "-";
        if (bytes === 0) return "0 B";
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const val = bytes / Math.pow(1024, i);
        return val.toFixed(2) + " " + sizes[i];
    }

    // สร้างลิงก์ดาวน์โหลดจากข้อมูล binary
    function createDownloadFromBytes(filename, mime, content) {
        if (currentObjectUrl) {
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
        }

        let blob;
        try {
            // content ที่ Worker ส่งมาเป็น ArrayBuffer หรือ Uint8Array
            blob = new Blob([content], { type: mime || "application/octet-stream" });
        } catch (e) {
            console.error("สร้าง Blob ไม่สำเร็จ:", e);
            $("#resultFileSize").text("สร้าง Blob ไม่สำเร็จ: " + e.message);
            return;
        }

        const url = URL.createObjectURL(blob);
        currentObjectUrl = url;

        $("#resultPlaceholder").addClass("d-none");
        $("#resultContent").removeClass("d-none");
        $("#resultFileName").text(filename);
        $("#resultFileSize").text("ประมาณ " + formatBytes(blob.size));

        $("#btnDownloadResult")
            .attr("href", url)
            .attr("download", filename || "Result.docx");
    }

    // เรียกแปลงไฟล์ผ่าน Worker
    function convertWithWorker() {
        if (!pdfWorker || !workerReady) {
            setStatus("กำลังตั้งค่า Web Worker / ยังไม่พร้อม โปรดลองใหม่อีกครั้ง", "warning", 10);
            initWorkerIfNeeded();
            return;
        }
        if (!currentFile) {
            alert("กรุณาเลือกไฟล์ PDF ก่อน");
            return;
        }

        const outFormat = $("input[name='outFormat']:checked").val() || "docx";
        const baseNameInput = $("#outFileBaseName").val().trim();
        const origName = currentFile.name || "input.pdf";
        const baseName = baseNameInput || (origName.replace(/\.pdf$/i, "") || "ResultPDF");
        const outName = baseName + (outFormat === "doc" ? ".doc" : ".docx");

        $("#statOutputFormat").text(outFormat.toUpperCase());

        setStatus("กำลังอ่านไฟล์ PDF และส่งให้เอนจินแปลง...", "info", 40);

        const reader = new FileReader();
        reader.onload = function (evt) {
            const buffer = evt.target.result;
            setStatus("กำลังแปลงไฟล์ โปรดรอสักครู่ (ขึ้นกับจำนวนหน้าและรูปภาพใน PDF)...", "info", 70);

            const operation = (outFormat === "doc") ? "AsposePdfToDoc" : "AsposePdfToDocX";

            // ตามตัวอย่าง Aspose: ส่ง operation + params ไปยัง Worker
            pdfWorker.postMessage({
                operation: operation,
                params: [buffer, currentFile.name, outName]
            }, [buffer]);
        };
        reader.onerror = function (err) {
            console.error(err);
            setStatus("อ่านไฟล์ PDF ไม่สำเร็จ: " + err.message, "danger", 0);
        };
        reader.readAsArrayBuffer(currentFile);
    }

    // (กรณีไม่ใช้ Worker) – แปลงใน main thread
    function convertWithoutWorker() {
        if (!currentFile) {
            alert("กรุณาเลือกไฟล์ PDF ก่อน");
            return;
        }

        const outFormat = $("input[name='outFormat']:checked").val() || "docx";
        const baseNameInput = $("#outFileBaseName").val().trim();
        const origName = currentFile.name || "input.pdf";
        const baseName = baseNameInput || (origName.replace(/\.pdf$/i, "") || "ResultPDF");
        const outName = baseName + (outFormat === "doc" ? ".doc" : ".docx");

        $("#statOutputFormat").text(outFormat.toUpperCase());
        setStatus("กำลังแปลงไฟล์บน main thread (หน้าอาจค้างชั่วคราว)...", "warning", 60);

        const reader = new FileReader();
        reader.onload = function (evt) {
            const buffer = evt.target.result;
            try {
                // ตัวอย่างตาม README Aspose: ใช้ฟังก์ชัน AsposePdfToDoc / AsposePdfToDocX โดยตรง
                const op = (outFormat === "doc") ? AsposePdfToDoc : AsposePdfToDocX;
                const json = op(buffer, currentFile.name, outName);

                if (json.errorCode === 0) {
                    // หมายเหตุ: SDK แต่ละเวอร์ชันอาจจัดเก็บข้อมูลไฟล์ผลลัพธ์ต่างกัน
                    // บางเวอร์ชันอาจมีเขตข้อมูล binary แยก (เช่น json.fileContent)
                    // ตัวอย่างนี้สมมติว่ามี json.fileContent (ArrayBuffer/Uint8Array)
                    if (json.fileContent) {
                        const mime = (outFormat === "doc")
                            ? "application/msword"
                            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                        createDownloadFromBytes(json.fileNameResult || outName, mime, json.fileContent);
                        setStatus("แปลงไฟล์สำเร็จ (แบบไม่ใช้ Worker) สามารถดาวน์โหลดได้แล้ว", "success", 100);
                    } else {
                        setStatus("แปลงไฟล์สำเร็จ แต่ไม่พบข้อมูล binary ในผลลัพธ์ (json.fileContent) กรุณาตรวจสอบเอกสาร SDK", "danger", 0);
                    }
                } else {
                    setStatus("เกิดข้อผิดพลาดในการแปลง: " + json.errorText, "danger", 0);
                }
            } catch (e) {
                console.error(e);
                setStatus("เกิดข้อผิดพลาดขณะเรียก AsposePdfToDocX/AsposePdfToDoc: " + e.message, "danger", 0);
            }
        };
        reader.onerror = function (err) {
            console.error(err);
            setStatus("อ่านไฟล์ PDF ไม่สำเร็จ: " + err.message, "danger", 0);
        };
        reader.readAsArrayBuffer(currentFile);
    }

    // จัดการไฟล์ที่ผู้ใช้เลือก
    function handleFileSelected(file) {
        if (!file) return;
        if (file.type && file.type !== "application/pdf") {
            alert("กรุณาเลือกไฟล์ PDF เท่านั้น");
            return;
        }
        currentFile = file;
        showFileInfo(file);
        setStatus("เลือกไฟล์เรียบร้อย กดปุ่ม “แปลงเป็น Word ตอนนี้” เพื่อเริ่ม", "info", 25);
    }

    // รีเซ็ตผลลัพธ์
    function clearResult() {
        if (currentObjectUrl) {
            URL.revokeObjectURL(currentObjectUrl);
            currentObjectUrl = null;
        }
        $("#resultContent").addClass("d-none");
        $("#resultPlaceholder").removeClass("d-none");
        $("#resultFileName").text("");
        $("#resultFileSize").text("ไม่ทราบแน่ชัด (ขึ้นอยู่กับเอนจินภายใน)");
    }

    // รีเซ็ตไฟล์
    function clearFile() {
        currentFile = null;
        $("#pdfFileInput").val("");
        $("#pdfFileInfo").addClass("d-none");
        $("#statInputSize").text("-");
    }

    // รีเซ็ตทุกอย่าง
    function resetAll() {
        clearFile();
        clearResult();
        $("#outDocx").prop("checked", true);
        $("#outFileBaseName").val("");
        $("#pageRange").val("");
        $("#optUseWorker").prop("checked", true);
        $("#statOutputFormat").text("-");
        setStatus("พร้อมเริ่มแปลง เลือกไฟล์ PDF ก่อน", "secondary", 0);
    }

    $(function () {
        // Dropzone: คลิกเพื่อเลือกไฟล์
        $("#btnChooseFile, #pdfDropZone").on("click", function (e) {
            // อย่าให้คลิกข้างในปุ่มซ้อนกันจนทำ event ประหลาด
            if (e.target.id === "btnChooseFile") {
                $("#pdfFileInput").trigger("click");
            } else if (e.target.id === "pdfDropZone") {
                $("#pdfFileInput").trigger("click");
            }
        });

        // รับไฟล์จาก input
        $("#pdfFileInput").on("change", function (e) {
            const file = e.target.files[0];
            handleFileSelected(file);
        });

        // Drag & drop
        $("#pdfDropZone").on("dragenter dragover", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).addClass("border-primary bg-white");
        }).on("dragleave dragend drop", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).removeClass("border-primary bg-white");
        }).on("drop", function (e) {
            const dt = e.originalEvent.dataTransfer;
            if (dt && dt.files && dt.files.length) {
                handleFileSelected(dt.files[0]);
            }
        });

        // ลบไฟล์
        $("#btnClearFile").on("click", function () {
            clearFile();
        });

        // ปุ่มแปลง
        $("#btnConvert").on("click", function () {
            if ($("#optUseWorker").is(":checked")) {
                initWorkerIfNeeded();
                // ให้เวลา worker ส่ง "ready" ถ้ายังไม่มา แล้วแปลงเลยก็ได้ (worker จะจัดการเอง)
                convertWithWorker();
            } else {
                convertWithoutWorker();
            }
        });

        // ปุ่มล้างผลลัพธ์
        $("#btnClearResult").on("click", function () {
            clearResult();
            setStatus("ผลลัพธ์ถูกล้างแล้ว คุณยังสามารถแปลงไฟล์เดิมซ้ำได้", "secondary", 10);
        });

        // ปุ่ม reset ทั้งหน้า
        $("#btnResetAll").on("click", function () {
            resetAll();
        });

        // ปุ่มตัวอย่าง – ในที่นี้แค่แสดงข้อความบอกให้ผู้ใช้ใช้ไฟล์ PDF ของตัวเอง
        $("#btnQuickSample").on("click", function () {
            alert("โหมดตัวอย่าง: กรุณาใช้ไฟล์ PDF ของคุณเองเพื่อทดสอบการแปลง\n(คุณสามารถเตรียมไฟล์ตัวอย่างเองแล้วอัปโหลดผ่านช่องทางด้านซ้าย)");
        });

        // เริ่มต้น
        setStatus("พร้อมเริ่มแปลง เลือกไฟล์ PDF ก่อน", "secondary", 0);
    });
})(jQuery);