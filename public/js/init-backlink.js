let backlink = [
    {
        href:"/post/2024/07/03/article-001.html",
        text:"คอมพิวเตอร์ตั้งแต่กำเนิดจนถึงปัจจุบัน",
        target:"_blank",
        rel:"noopener noreferrer"
    },
    {
        href:"/post/2024/07/03/blog-001.html",
        text:"ที่ติดไวรัสเข้ากับคอมพิวเตอร์ของคุณ",
        target:"_blank",
        rel:"noopener noreferrer"
    },
    {
        href:"/post/2024/07/03/novel-001.html",
        text:"กระต่ายกับเต่า เวอร์ชันใหม่",
        target:"_blank",
        rel:"noopener noreferrer"
    },
    {
        href:"/post/2024/07/09/blog-002.html",
        text:"พนักงานราชการ นักวิชาการสหกรณ์ กรมส่งเสริมสหกรณ์",
        target:"_blank",
        rel:"noopener noreferrer"
    },
    {
        href:"/post/2024/07/09/blog-003.html",
        text:"สำนักงานปลัดกระทรวงสาธารณสุข ข้าราชการ พยาบาลวิชาชีพปฏิบัติการ",
        target:"_blank",
        rel:"noopener noreferrer"
    },
    {
        href:"/post/2024/07/09/article-002.html",
        text:"วิธีสร้างรหัสผ่านที่ปลอดภัย",
        target:"_blank",
        rel:"noopener noreferrer"
    },
    {
        href:"/post/2024/07/09/Samsung Galaxy S23 Ultra (5G).html",
        text:"Samsung Galaxy S23 Ultra (5G)",
        target:"_blank",
        rel:"noopener noreferrer"
    }
];

function createBacklink(obj) {
    var backlink = document.createElement('a');
    backlink.href = obj.href;  // URL ของ Backlink
    backlink.textContent = obj.text;
    backlink.title = obj.text;
    backlink.style.padding = "5px";
    // backlink.target = obj.target;  // เปิดลิงก์ในแท็บใหม่
    // backlink.rel = obj.rel;  // เพิ่มความปลอดภัย

    try {
        var content = document.getElementById('content-backlink');
        content.appendChild(backlink);
    } catch (error) { }
}

backlink.forEach(element => {
    createBacklink(element);
});

$('.navbar-brand').append('KRIS-P19').css({'color':'white'});

$('a').each(function(k,v){
    var noCaches = new Date().getTime() + '-' + k;
    $(this).attr('href',$(this).attr('href') + '?nocache=' + noCaches)
    .attr('title',$(this).text());
});