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
    backlink.title = obj.text;
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