(function ($) {
  function isRegexAllowedAfter(ch) {
    if (ch === null) return true;
    return "([,{=:+-*%!&|^?;<>".indexOf(ch) !== -1;
  }

  // ลบ comment โดยพยายามไม่ยุ่งกับ string, template, regex literal
  function stripComments(source, options) {
    if (!options.removeComments) return source;

    let out = "";
    let inSingle = false, inDouble = false, inTemplate = false, inRegex = false;
    let inLineComment = false, inBlockComment = false;
    let escapeNext = false;
    let prevNonSpace = null;

    for (let i = 0; i < source.length; i++) {
      let c = source[i];
      let next = source[i + 1];

      if (inLineComment) {
        if (c === "\\n" || c === "\\r" || c === "\n" || c === "\r") {
          inLineComment = false;
          out += c;
        }
        continue;
      }

      if (inBlockComment) {
        if (c === "*" && next === "/") {
          inBlockComment = false;
          i++;
        }
        continue;
      }

      if (escapeNext) {
        out += c;
        escapeNext = false;
        continue;
      }

      if (inSingle || inDouble || inTemplate || inRegex) {
        out += c;
        if (c === "\\\\") {
          escapeNext = true;
          continue;
        }
        if (inSingle && c === "'") inSingle = false;
        else if (inDouble && c === '"') inDouble = false;
        else if (inTemplate && c === "`") inTemplate = false;
        else if (inRegex && c === "/") inRegex = false;
        continue;
      }

      // ไม่ได้อยู่ใน string/comment/regex
      if (c === "/" && next === "/") {
        inLineComment = true;
        i++;
        continue;
      }
      if (c === "/" && next === "*") {
        // ถ้าเลือกเก็บ /*! ... */ เอาไว้
        if (options.keepLicense && source[i + 2] === "!") {
          out += "/*!";
          i += 2;
          inBlockComment = true; // แต่เรายังเก็บไว้ทั้งก้อน
          continue;
        }
        inBlockComment = true;
        i++;
        continue;
      }

      // เริ่ม string/template
      if (c === "'") {
        inSingle = true; out += c; continue;
      }
      if (c === '"') {
        inDouble = true; out += c; continue;
      }
      if (c === "`") {
        inTemplate = true; out += c; continue;
      }

      // ตรวจ regex literal
      if (c === "/" && next !== "/" && next !== "*") {
        if (isRegexAllowedAfter(prevNonSpace)) {
          inRegex = true;
          out += c;
          continue;
        }
      }

      out += c;
      if (!/\\s/.test(c)) {
        prevNonSpace = c;
      }
    }
    return out;
  }

  // ตัดช่องว่างส่วนเกินต้น–ท้ายแต่ละบรรทัด
  function trimLines(source) {
    return source.split(/\\r?\\n/).map(function (line) {
      return line.replace(/^\\s+|\\s+$/g, "");
    }).join("\\n");
  }

  function minifyJs(source, opts) {
    let originalLength = source.length;

    let code = source;
    code = stripComments(code, {
      removeComments: opts.removeComments,
      keepLicense: opts.keepLicense
    });

    if (opts.trimLines) {
      code = trimLines(code);
    }

    if(opts.singleLine){
      code = toSingleLine(code);
    }

    let minLength = code.length;
    let saved = originalLength > 0 ? ((originalLength - minLength) / originalLength * 100) : 0;

    return {
      code: code,
      originalLength: originalLength,
      minLength: minLength,
      savedPercent: Math.round(saved)
    };
  }

  function updateStats(stats) {
    $("#statOriginal").text(stats.originalLength);
    $("#statMinified").text(stats.minLength);
    $("#statSaved").text(stats.originalLength ? stats.savedPercent + "%" : "0%");
  }

  function doMinify() {
    const src = $("#inputCode").val() || "";
    if (!src.trim()) {
      alert("กรุณาวางโค้ด JavaScript ก่อนทำการแปลง");
      return;
    }
    const opts = {
      removeComments: $("#optRemoveComments").is(":checked"),
      keepLicense: $("#optKeepLicense").is(":checked"),
      trimLines: $("#optTrimLines").is(":checked"),
      singleLine: $("#optSingleLine").is(":checked")
    };

    const stats = minifyJs(src, opts);
    $("#outputCode").val(stats.code);
    updateStats(stats);
  }

  function toSingleLine(source) {
    // ลบ line break ทั้งหมด
    let s = source.replace(/[\r\n]+/g, " ");
    // ลดช่องว่างซ้ำให้เหลือช่องว่างเดียว
    s = s.replace(/\s\s+/g, " ");
    // ตัดช่องว่างหน้า ; , { } () =
    s = s.replace(/\s*([;:{}(),=+\-])\s*/g, "$1");
    return s.trim();
  }


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

  $(function () {
    $("#btnMinify, #btnMinifyNow").on("click", function () {
      doMinify();
    });

    $("#btnClear").on("click", function () {
      $("#inputCode").val("");
      $("#outputCode").val("");
      updateStats({ originalLength: 0, minLength: 0, savedPercent: 0 });
    });

    $("#btnSample").on("click", function () {
      fillSample();
    });

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

    $("#btnDownload").on("click", function () {
      const out = $("#outputCode").val();
      if (!out) {
        alert("ยังไม่มีโค้ดสำหรับดาวน์โหลด");
        return;
      }
      downloadFile("minified.js", out);
    });

    // ค่าเริ่มต้น
    updateStats({ originalLength: 0, minLength: 0, savedPercent: 0 });
  });
})(jQuery);