function searchDuckDuckGo() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}