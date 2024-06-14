$(document).ready(function(){
    fetch('/resource/layouts/navbar.html?no-cache=' + Math.random(),{ cache: 'no-store' })
    .then(response => response.text())
    .then(data => {
        $('#navbar-container').html(data);
    })
    .catch(error => console.error('Error loading navbar:', error));

    fetch('/resource/layouts/footer.html?no-cache=' + Math.random(),{ cache: 'no-store' })
    .then(response2 => response2.text())
    .then(data2 => {
        $('#footer-container').html(data2);
    })
    .catch(error => console.error('Error loading footer:', error));

    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 'home';
    const path = params.get('path') || '/';
    const user = params.get('user') || '';
    const tiktokVideo = params.get('tiktokVideo') || '';
    const tiktokUser = params.get('tiktokUser') || '';
    fetch(`/resource/views/${path}/${page}.html?no-cache=${Math.random()}`,{ cache: 'no-store' })
    .then(response3 => {
        if (!response3.ok) {
            throw new Error('Network response was not ok');
        }
        return response3.text();
    })
    .then(data3 => {
        $('#content-container').html(data3);
        if (user!=undefined&&user!='') {
            $('#content-container').find('blockquote')
                .attr('cite','https://www.tiktok.com/@' + user + '?time=' + Math.random())
                .attr('data-unique-id', user);
            $('#content-container').find('blockquote section a').attr('href','https://www.tiktok.com/@' + user + '?refer=creator_embed&time=' + Math.random());
            $('#content-container').find('#title').text('@' + user);
            $('meta[name="description"]').attr('content',user);
            $('meta[name="keywords"]').attr('content', user + ',Pound-DEV,Developer,Programer');
            $('title').text( user + ' - Pound-DEV');
        } else if(tiktokVideo!=undefined&&tiktokVideo!=''&&tiktokUser!=undefined&&tiktokUser!='') {
            $('#content-container').find('blockquote')
                .attr('cite','https://www.tiktok.com/@' + tiktokUser + '/video/' + tiktokVideo + '?time=' + Math.random())
                .attr('data-video-id', tiktokVideo);
            $('#content-container').find('#title').text('@' + tiktokUser);
            $('meta[name="description"]').attr('content',tiktokUser);
            $('meta[name="keywords"]').attr('content', tiktokUser + ',Pound-DEV,Developer,Programer');
            $('title').text(tiktokUser + ' - Pound-DEV');
        }
    })
    .catch(error => {
        $('#content-container').html('<p>Sorry, the requested page could not be loaded.</p>');
        console.error('Error loading page:', error);
    });
    
    $.get(`https://shop24hr.vercel.app/asset/data/data1.csv`, function(data) {
        var parsedData = Papa.parse(data, {
            header: true,
            dynamicTyping: true
        });
        $(parsedData.data).each(function(k,v){
            console.log(v);
        });
    });

});
