let backlink = [
    {
        href:"/post/2024/07/03/article-001.html?nocache=" + Math.random(),
        text:"คอมพิวเตอร์ตั้งแต่กำเนิดจนถึงปัจจุบัน",
        target:"_blank",
        rel:"noopener noreferrer"
    },
    {
        href:"/post/2024/07/03/blog-001.html?nocache=" + Math.random(),
        text:"ที่ติดไวรัสเข้ากับคอมพิวเตอร์ของคุณ",
        target:"_blank",
        rel:"noopener noreferrer"
    },
    {
        href:"/post/2024/07/03/novel-001.html?nocache=" + Math.random(),
        text:"กระต่ายกับเต่า เวอร์ชันใหม่",
        target:"_blank",
        rel:"noopener noreferrer"
    }
    
];

function createBacklink(obj) {
    var backlink = document.createElement('a');
    backlink.href = obj.href;  // URL ของ Backlink
    backlink.textContent = obj.text;
    backlink.target = obj.target;  // เปิดลิงก์ในแท็บใหม่
    backlink.rel = obj.rel;  // เพิ่มความปลอดภัย

    // เลือกตำแหน่งที่ต้องการเพิ่ม Backlink
    var content = document.getElementById('content-backlink');
    content.appendChild(backlink);
}

backlink.forEach(element => {
    createBacklink(element);
});