function search() {
    const query = document.getElementById('searchQuery').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!query) {
        alert('กรุณากรอกคำค้นหา');
        return;
    }

    fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`)
        .then(response => response.json())
        .then(data => {
            // เช็ค Abstract (ข้อมูลหลัก)
            if (data.AbstractText && data.AbstractURL) {
                const item = document.createElement('div');
                item.className = 'result-item';
                item.innerHTML = `
            <a href="${data.AbstractURL}" target="_blank">${data.Heading}</a>
            <small>${data.AbstractURL}</small>
            <p>${data.AbstractText}</p>
          `;
                resultsDiv.appendChild(item);
            }

            // เช็ค RelatedTopics (ลิงก์อื่น ๆ)
            if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                data.RelatedTopics.forEach(topic => {
                    // บางที RelatedTopics มี nested Topics ซ้ำ ต้องเช็ค
                    if (topic.Topics) {
                        topic.Topics.forEach(subTopic => {
                            if (subTopic.FirstURL && subTopic.Text) {
                                const item = document.createElement('div');
                                item.className = 'result-item';
                                item.innerHTML = `
                    <a href="${subTopic.FirstURL}" target="_blank">${subTopic.Text}</a>
                    <small>${subTopic.FirstURL}</small>
                  `;
                                resultsDiv.appendChild(item);
                            }
                        });
                    } else {
                        if (topic.FirstURL && topic.Text) {
                            const item = document.createElement('div');
                            item.className = 'result-item';
                            item.innerHTML = `
                  <a href="${topic.FirstURL}" target="_blank">${topic.Text}</a>
                  <small>${topic.FirstURL}</small>
                `;
                            resultsDiv.appendChild(item);
                        }
                    }
                });
            }

            if (resultsDiv.innerHTML === '') {
                resultsDiv.innerHTML = '<p>ไม่พบผลลัพธ์ที่เกี่ยวข้อง</p>';
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาด:', error);
            resultsDiv.innerHTML = '<p>เกิดข้อผิดพลาดในการค้นหา</p>';
        });
}