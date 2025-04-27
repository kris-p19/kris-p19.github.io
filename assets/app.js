function search() {
    const query = document.getElementById('searchQuery').value.trim();
    const engine = document.getElementById('searchEngine').value;
    const iframe = document.getElementById('searchFrame');

    if (!query) {
        alert('Please enter a search query!');
        return;
    }

    let url = '';

    if (engine === 'duckduckgo') {
        url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    } else if (engine === 'bing') {
        url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    }

    iframe.src = url;
}