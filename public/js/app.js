$(document).ready(function(){
    fetch('/resource/layouts/navbar.html',{ cache: 'force-cache' })
    .then(response => response.text())
    .then(data => {
        $('#navbar-container').html(data);
    })
    .catch(error => console.error('Error loading navbar:', error));

    fetch('/resource/layouts/footer.html',{ cache: 'force-cache' })
    .then(response => response.text())
    .then(data => {
        $('#footer-container').html(data);
    })
    .catch(error => console.error('Error loading footer:', error));

    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 'home';
    fetch(`/resource/views/${page}.html`,{ cache: 'force-cache' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        $('#content-container').html(data);
    })
    .catch(error => {
        $('#content-container').html('<p>Sorry, the requested page could not be loaded.</p>');
        console.error('Error loading page:', error);
    });
});