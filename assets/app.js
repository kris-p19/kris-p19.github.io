// CORS Anywhere Proxy URL
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

// ฟังก์ชันค้นหา
function searchWikipedia() {
    const searchTerm = document.getElementById('search-term').value;

    if (!searchTerm) {
        alert('Please enter a search term.');
        return;
    }

    // URL ของ Wikipedia API Search
    const targetUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}&utf8=1`;

    // เรียกใช้ CORS Anywhere Proxy
    doCORSRequest({
        method: 'GET',
        url: targetUrl,
        data: null
    }, function printResult(result) {
        const data = JSON.parse(result);
        const searchResults = data.query.search;
        console.log(data);
        if (searchResults.length > 0) {
            let resultsHTML = '<h2>Search Results:</h2>';

            // Loop แสดงผลลัพธ์การค้นหา
            searchResults.forEach(result => {
                resultsHTML += `
          <div>
            <h3><a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">${result.title}</a></h3>
            <p>${result.snippet}...</p>
          </div>
        `;
            });

            document.getElementById('wiki-content').innerHTML = resultsHTML;
        } else {
            document.getElementById('wiki-content').innerHTML = '<p>No results found.</p>';
        }
    });
}

// ฟังก์ชัน CORS Request
function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function () {
        printResult(
            options.method + ' ' + options.url + '\n' +
            x.status + ' ' + x.statusText + '\n\n' +
            (x.responseText || '')
        );
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
}

// Bind event
document.getElementById('search').onclick = function (e) {
    e.preventDefault();
    searchWikipedia();
};