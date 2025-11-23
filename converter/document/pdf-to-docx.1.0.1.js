setTimeout(() => {
    (function () {
        // ตั้งค่า worker ของ pdf.js (จำเป็น)
        if (window['pdfjsLib']) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        const inputPdfFile = document.getElementById('inputPdfFile');
        const dropZone = document.getElementById('dropZone');
        const btnChooseFile = document.getElementById('btnChooseFile');
        const btnChooseFileHero = document.getElementById('btnChooseFileHero');
        const btnClearHero = document.getElementById('btnClearHero');
        const btnRemoveFile = document.getElementById('btnRemoveFile');
        const btnConvert = document.getElementById('btnConvert');
        const btnClear = document.getElementById('btnClear');
        const btnDownloadDocx = document.getElementById('btnDownloadDocx');

        const fileInfoWrapper = document.getElementById('fileInfoWrapper');
        const fileNameSpan = document.getElementById('fileName');
        const fileSizeSpan = document.getElementById('fileSize');

        const optSplitParagraph = document.getElementById('optSplitParagraph');
        const optTrimSpaces = document.getElementById('optTrimSpaces');
        const selectFontSize = document.getElementById('selectFontSize');

        const statusBadge = document.getElementById('statusBadge');
        const statusText = document.getElementById('statusText');
        const progressBar = document.getElementById('progressBar');

        const statPdfSize = document.getElementById('statPdfSize');
        const statDocxSize = document.getElementById('statDocxSize');
        const statTimeUsed = document.getElementById('statTimeUsed');

        const resultEmptyState = document.getElementById('resultEmptyState');
        const resultReadyState = document.getElementById('resultReadyState');

        let selectedFile = null;
        let downloadUrl = null;
        let startTime = null;

        function formatBytes(bytes) {
            if (!bytes && bytes !== 0) return '-';
            const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return '0 bytes';
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
        }

        function resetAll() {
            selectedFile = null;
            if (downloadUrl) {
                URL.revokeObjectURL(downloadUrl);
                downloadUrl = null;
            }

            inputPdfFile.value = '';
            fileInfoWrapper.classList.add('d-none');
            fileNameSpan.textContent = 'ไม่มีไฟล์ที่เลือก';
            fileSizeSpan.textContent = '-';

            statPdfSize.textContent = '0';
            statDocxSize.textContent = '0';
            statTimeUsed.textContent = '0s';

            statusBadge.className = 'badge bg-secondary rounded-pill';
            statusBadge.textContent = 'รอเลือกไฟล์';
            statusText.textContent = 'กรุณาเลือกไฟล์ PDF และกดปุ่ม "แปลงเป็น Word (.docx)" เพื่อเริ่มการแปลง';

            progressBar.style.width = '0%';
            progressBar.classList.remove('progress-bar-striped', 'progress-bar-animated');

            resultEmptyState.classList.remove('d-none');
            resultReadyState.classList.add('d-none');
            btnDownloadDocx.disabled = true;
        }

        function setFile(file) {
            if (!file) return;
            if (file.type !== 'application/pdf') {
                alert('กรุณาเลือกไฟล์ที่มีนามสกุล .pdf เท่านั้น');
                return;
            }
            selectedFile = file;
            fileInfoWrapper.classList.remove('d-none');
            fileNameSpan.textContent = file.name || 'ไม่ทราบชื่อไฟล์';
            fileSizeSpan.textContent = formatBytes(file.size);
            statPdfSize.textContent = formatBytes(file.size);

            statusBadge.className = 'badge bg-info rounded-pill';
            statusBadge.textContent = 'พร้อมแปลง';
            statusText.textContent = 'กดปุ่ม "แปลงเป็น Word (.docx)" เพื่อเริ่มการอ่านข้อความจาก PDF';
        }

        // CLICK CHOOSE FILE
        btnChooseFile.addEventListener('click', function () {
            inputPdfFile.click();
        });
        btnChooseFileHero.addEventListener('click', function () {
            inputPdfFile.click();
        });
        btnClearHero.addEventListener('click', resetAll);

        // FILE INPUT CHANGE
        inputPdfFile.addEventListener('change', function (e) {
            const file = e.target.files[0];
            setFile(file);
        });

        // DROP ZONE EVENTS
        dropZone.addEventListener('dragover', function (e) {
            e.preventDefault();
            dropZone.classList.add('border-primary', 'bg-white');
        });
        dropZone.addEventListener('dragleave', function (e) {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-white');
        });
        dropZone.addEventListener('drop', function (e) {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-white');
            const file = e.dataTransfer.files[0];
            setFile(file);
        });

        // REMOVE FILE
        btnRemoveFile.addEventListener('click', function () {
            selectedFile = null;
            inputPdfFile.value = '';
            fileInfoWrapper.classList.add('d-none');
            fileNameSpan.textContent = 'ไม่มีไฟล์ที่เลือก';
            fileSizeSpan.textContent = '-';

            statusBadge.className = 'badge bg-secondary rounded-pill';
            statusBadge.textContent = 'รอเลือกไฟล์';
            statusText.textContent = 'กรุณาเลือกไฟล์ PDF ก่อนเริ่มการแปลง';
        });

        // CLEAR ALL
        btnClear.addEventListener('click', resetAll);

        // ฟังก์ชันอ่าน PDF แล้วคืนค่าเป็นข้อความยาว ๆ
        async function extractTextFromPdf(file) {
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;

            let fullText = '';

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                statusBadge.className = 'badge bg-warning text-dark rounded-pill';
                statusBadge.textContent = 'กำลังอ่านข้อความจากหน้า ' + pageNum + '/' + pdf.numPages;
                progressBar.style.width = (pageNum / (pdf.numPages + 1)) * 70 + '%';

                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const strings = textContent.items.map(item => item.str);

                let pageText = strings.join(' ');
                if (optTrimSpaces.checked) {
                    pageText = pageText
                        .split('\n')
                        .map(line => line.trim())
                        .join('\n');
                }

                fullText += pageText + '\n\n';
            }

            return fullText;
        }

        // แปลงข้อความเป็นไฟล์ Word (.docx)
        async function createDocxFromText(text) {
            const { Document, Paragraph, Packer, TextRun } = docx;

            let paragraphs = [];

            if (optSplitParagraph.checked) {
                // แยกย่อหน้าตามบรรทัดว่าง
                const blocks = text.split(/\n\s*\n/);
                paragraphs = blocks.map(block => {
                    return new Paragraph({
                        children: [
                            new TextRun({
                                text: block.replace(/\s+/g, ' ').trim(),
                                size: parseInt(selectFontSize.value, 10) || 20
                            })
                        ]
                    });
                });
            } else {
                // ยาว ๆ ย่อหน้าเดียว
                paragraphs = [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: text.replace(/\s+/g, ' ').trim(),
                                size: parseInt(selectFontSize.value, 10) || 20
                            })
                        ]
                    })
                ];
            }

            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: paragraphs
                    }
                ]
            });

            const blob = await Packer.toBlob(doc);
            return blob;
        }

        // CONVERT
        btnConvert.addEventListener('click', async function () {
            if (!selectedFile) {
                alert('กรุณาเลือกไฟล์ PDF ก่อน');
                return;
            }
            // if (!window['pdfjsLib'] || !window['docx']) {
            //     alert('ไม่สามารถโหลดไลบรารี pdf.js หรือ docx.js ได้');
            //     return;
            // }
            if (typeof pdfjsLib === 'undefined' || typeof docx === 'undefined') {
                alert('ไม่สามารถโหลดไลบรารี pdf.js หรือ docx.js ได้');
                return;
            }

            try {
                startTime = Date.now();
                progressBar.classList.add('progress-bar-striped', 'progress-bar-animated');
                progressBar.style.width = '10%';

                statusBadge.className = 'badge bg-warning text-dark rounded-pill';
                statusBadge.textContent = 'กำลังประมวลผล...';
                statusText.textContent = 'กำลังอ่านข้อความจากไฟล์ PDF โปรดรอสักครู่...';

                resultEmptyState.classList.remove('d-none');
                resultReadyState.classList.add('d-none');
                btnDownloadDocx.disabled = true;

                // 1) ดึงข้อความจาก PDF
                const text = await extractTextFromPdf(selectedFile);

                // 2) แปลงข้อความเป็นไฟล์ Word
                statusBadge.textContent = 'กำลังสร้างไฟล์ Word...';
                progressBar.style.width = '80%';

                const blob = await createDocxFromText(text);

                if (downloadUrl) {
                    URL.revokeObjectURL(downloadUrl);
                }
                downloadUrl = URL.createObjectURL(blob);

                // อัปเดตสถิติ
                statDocxSize.textContent = formatBytes(blob.size);
                const elapsedMs = Date.now() - startTime;
                statTimeUsed.textContent = (elapsedMs / 1000).toFixed(2) + 's';

                // UI เสร็จแล้ว
                progressBar.style.width = '100%';
                progressBar.classList.remove('progress-bar-animated');

                statusBadge.className = 'badge bg-success rounded-pill';
                statusBadge.textContent = 'แปลงเสร็จแล้ว';

                statusText.textContent =
                    'แปลงข้อความจาก PDF เป็น Word สำเร็จแล้ว หาก Layout ยังไม่ถูกใจ สามารถจัดใหม่ใน Word ได้ตามต้องการ';

                resultEmptyState.classList.add('d-none');
                resultReadyState.classList.remove('d-none');
                btnDownloadDocx.disabled = false;
            } catch (err) {
                console.error(err);
                statusBadge.className = 'badge bg-danger rounded-pill';
                statusBadge.textContent = 'เกิดข้อผิดพลาด';
                statusText.textContent = 'ไม่สามารถแปลงไฟล์ได้: ' + err.message;

                progressBar.style.width = '0%';
                progressBar.classList.remove('progress-bar-striped', 'progress-bar-animated');
            }
        });

        // DOWNLOAD DOCX
        btnDownloadDocx.addEventListener('click', function () {
            if (!downloadUrl || !selectedFile) return;
            const a = document.createElement('a');
            const baseName = (selectedFile.name || 'document.pdf').replace(/\.pdf$/i, '');
            a.href = downloadUrl;
            a.download = baseName + '.docx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });

        // เรียกตอนโหลดหน้า
        resetAll();
    })();
}, 1000);