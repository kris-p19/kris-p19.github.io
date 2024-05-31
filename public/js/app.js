$(document).ready(function(){
    fetch('/resource/layouts/navbar.html?no-cache=' + Math.random(),{ cache: 'no-store' })
    .then(response => response.text())
    .then(data => {
        $('#navbar-container').html(data);
    })
    .catch(error => console.error('Error loading navbar:', error));

    fetch('/resource/layouts/footer.html?no-cache=' + Math.random(),{ cache: 'no-store' })
    .then(response => response.text())
    .then(data => {
        $('#footer-container').html(data);
    })
    .catch(error => console.error('Error loading footer:', error));

    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 'home';
    const path = params.get('path') || '/';
    const user = params.get('user') || '';
    fetch(`/resource/views/${path}/${page}.html?no-cache=${Math.random()}`,{ cache: 'no-store' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        $('#content-container').html(data);
        if (user!=undefined&&user!='') {
            $('#content-container').find('blockquote')
                .attr('cite','https://www.tiktok.com/@' + user)
                .attr('data-unique-id', user);
            $('#content-container').find('blockquote section a').attr('href','https://www.tiktok.com/@' + user + '?refer=creator_embed');
            $('#content-container').find('#title').text('@' + user);
            $('meta[name="description"]').attr('content',user);
            $('meta[name="keywords"]').attr('content', user + ',Pound-DEV,Developer,Programer');
            $('title').text( user + ' - Pound-DEV');
        }
    })
    .catch(error => {
        $('#content-container').html('<p>Sorry, the requested page could not be loaded.</p>');
        console.error('Error loading page:', error);
    });
});