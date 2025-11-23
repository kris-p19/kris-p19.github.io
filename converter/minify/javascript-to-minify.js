(function ($) {
  // รวมโค้ดให้เป็นบรรทัดเดียว (ใช้กับโหมด Single Line)
  function toSingleLine(source) {
    let s = source.replace(/[\r\n]+/g, " ");       // ลบ line break
    s = s.replace(/\s\s+/g, " ");                  // ลดช่องว่างซ้ำ
    s = s.replace(/\s*([;:{}(),=+\-])\s*/g, "$1"); // ตัดช่องว่างรอบ ๆ symbol ทั่วไป
    return s.trim();
  }

  // อัปเดตสถิติความยาว
  function updateStats(stats) {
    $("#statOriginal").text(stats.originalLength);
    $("#statMinified").text(stats.minLength);
    $("#statSaved").text(stats.originalLength ? stats.savedPercent + "%" : "0%");
  }

  // ดาวน์โหลดไฟล์ .js
  function downloadFile(filename, text) {
    const blob = new Blob([text], { type: "application/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // โค้ดตัวอย่าง
  function fillSample() {
    const sample =
      `// ตัวอย่างโค้ด JavaScript
function sayHello(name) {
    // แสดงข้อความใน console
    console.log("Hello " + name); /* inline comment */
}

/*!
 * ตัวอย่าง license comment จะถูกเก็บไว้ ถ้าเลือก "คงไว้เฉพาะ /*!"
 */

sayHello("World");`;
    $("#inputCode").val(sample);
  }

  // ดึง options จาก UI
  function getOptions() {
    return {
      removeComments: $("#optRemoveComments").is(":checked"),
      keepLicense: $("#optKeepLicense").is(":checked"),
      trimLines: $("#optTrimLines").is(":checked"),
      singleLine: $("#optSingleLine").is(":checked")
    };
  }

  // ใช้ Terser.minify จริงๆ ตรงนี้
  async function doMinify() {
    const src = $("#inputCode").val() || "";
    if (!src.trim()) {
      alert("กรุณาวางโค้ด JavaScript ก่อนทำการแปลง");
      return;
    }

    const opts = getOptions();
    const originalLength = src.length;

    // ตั้งค่า options สำหรับ Terser
    const terserOptions = {
      compress: true,
      mangle: false,    // ถ้าอยากให้เปลี่ยนชื่อตัวแปรให้สั้นลง ให้เปลี่ยนเป็น true
      format: {}
    };

    // จัดการเรื่องคอมเมนต์
    if (opts.removeComments) {
      if (opts.keepLicense) {
        // เก็บเฉพาะคอมเมนต์ที่ขึ้นต้นด้วย /*!
        terserOptions.format.comments = /^!/;
      } else {
        // ลบทุกคอมเมนต์
        terserOptions.format.comments = false;
      }
    }

    try {
      // เรียกใช้ Terser ผ่าน global Terser.minify (จาก CDN)
      const result = await Terser.minify(src, terserOptions);

      if (result.error) {
        console.error(result.error);
        alert("มีข้อผิดพลาดในโค้ด JavaScript ไม่สามารถ minify ได้");
        return;
      }

      let code = result.code || "";

      // ถ้าเลือก trimLines (แต่ไม่ single line) ก็เก็บบรรทัดไว้แต่ตัดช่องว่างหัวท้าย
      if (opts.trimLines && !opts.singleLine) {
        code = code
          .split(/\r?\n/)
          .map(line => line.replace(/^\s+|\s+$/g, ""))
          .join("\n");
      }

      // โหมด Single Line
      if (opts.singleLine) {
        code = toSingleLine(code);
      }

      const minLength = code.length;
      const saved = originalLength > 0
        ? Math.round((originalLength - minLength) / originalLength * 100)
        : 0;

      $("#outputCode").val(code);
      updateStats({
        originalLength: originalLength,
        minLength: minLength,
        savedPercent: saved
      });

    } catch (e) {
      console.error(e);
      alert("เกิดข้อผิดพลาดระหว่างเรียก Terser.minify กรุณาตรวจสอบโค้ดอีกครั้ง");
    }
  }

  $(function () {
    // ปุ่มแปลงโค้ด
    $("#btnMinify, #btnMinifyNow").on("click", function () {
      // ใช้ async function แยกอยู่แล้ว
      doMinify();
    });

    // ล้างโค้ด
    $("#btnClear").on("click", function () {
      $("#inputCode").val("");
      $("#outputCode").val("");
      updateStats({ originalLength: 0, minLength: 0, savedPercent: 0 });
    });

    // ใส่โค้ดตัวอย่าง
    $("#btnSample").on("click", function () {
      fillSample();
    });

    // คัดลอกผลลัพธ์
    $("#btnCopyOutput").on("click", function () {
      const out = $("#outputCode").val();
      if (!out) {
        alert("ยังไม่มีผลลัพธ์ให้คัดลอก");
        return;
      }
      navigator.clipboard.writeText(out).then(function () {
        alert("คัดลอกโค้ดที่แปลงแล้วเรียบร้อย");
      }).catch(function () {
        alert("เบราว์เซอร์ไม่รองรับการคัดลอกอัตโนมัติ กรุณาคัดลอกเอง");
      });
    });

    // ดาวน์โหลด .js
    $("#btnDownload").on("click", function () {
      const out = $("#outputCode").val();
      if (!out) {
        alert("ยังไม่มีโค้ดสำหรับดาวน์โหลด");
        return;
      }
      downloadFile("minified.js", out);
    });

    // ค่าเริ่มต้นสถิติ
    updateStats({ originalLength: 0, minLength: 0, savedPercent: 0 });
  });
})(jQuery);