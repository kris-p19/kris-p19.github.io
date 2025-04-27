// ฟังก์ชันค้นหา
function searchWikipedia() {
    // รับค่าคำค้นหาจาก input
    const searchTerm = document.getElementById('search-term').value;

    // ถ้าไม่มีการกรอกคำค้นหาจะไม่ทำการค้นหา
    if (!searchTerm) {
        alert('Please enter a search term.');
        return;
    }

    // URL ของ Wikipedia API Search
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&utf8=1`;

    // เรียกใช้ API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const searchResults = data.query.search;

            // ถ้ามีผลลัพธ์
            if (searchResults.length > 0) {
                let resultsHTML = '<h2>Search Results:</h2>';

                // loop แสดงผลลัพธ์
                searchResults.forEach(result => {
                    resultsHTML += `
              <div>
                <h3><a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">${result.title}</a></h3>
                <p>${result.snippet}...</p>
              </div>
            `;
                });

                // แสดงผลลัพธ์
                document.getElementById('wiki-content').innerHTML = resultsHTML;
            } else {
                document.getElementById('wiki-content').innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('wiki-content').innerHTML = '<p>There was an error fetching the data.</p>';
        });
}