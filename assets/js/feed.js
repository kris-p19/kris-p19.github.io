const feedUrl = 'https://rssfeeds.sanook.com/rss/feeds/sanook/news.index.xml'; // ใส่ URL feed ของคุณ
const container = document.getElementById('feed-container');

async function fetchFeed() {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`);
        const data = await response.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "application/xml");

        const items = xml.querySelectorAll("item");
        let html = "<ul>";

        items.forEach((item, index) => {
            // if (index >= 5) return; // จำกัดแค่ 5 ข่าว
            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            html += `<li><a href="${link}" target="_blank">${title}</a></li>`;
        });

        html += "</ul>";
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = "เกิดข้อผิดพลาดในการโหลดข่าว";
        console.error("Feed error:", error);
    }
}

fetchFeed();