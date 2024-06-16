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
            if (k < (((parsedData.data).length)-1)) {
                $('#products-list').append(`
                    <div class="col-md-4 product-list-lsf">
                        <a href="${v.link_af}" title="${v.name}" rel="nofollow" target="_blank" style="text-decoration:none;">
                            <div class="card card-default m-2">
                                <div class="card-body">
                                    <center><img src="${v.image==null||v.image==undefined?'https://shop24hr.vercel.app/asset/images/messageImage_1718372326078.jpg':v.image}" class="img-responsive" style="width:150px;display:block;text-align:center;" onerror="this.style.display='none';"></center>
                                    [ขายแล้ว ${v.selled}] [${v.price}] ${v.name}
                                </div>
                            </div>
                        </a>
                    </div>
                `);
            }
        });
    });

    fetch(`https://marinemap.dmcr.go.th/go/load-xml?url=https://rssfeeds.sanook.com/rss/feeds/sanook/news.index.xml`)
    .then(response3 => {
        if (!response3.ok) {
            throw new Error('Network response was not ok');
        }
        return response3.text();
    })
    .then(data3 => {
        const d = JSON.parse(data3);
        $(d.rss.channel).each(function(k,v){
            console.log(v.description[0]);
            console.log(v.title[0]);
            console.log(v.pubDate[0]);

            $(v.item).each(function(k2,v2){
                console.log(v2);
                $('#snook-feed').append(`
                    <div class="col">
                        <div class="card h-100">
                            <img src="${v2.enclosure[0].$.url}" class="card-img-top" alt="${v2.title[0]}">
                            <div class="card-body">
                                <h5 class="card-title">${v2.title[0]}</h5>
                                <p class="card-text">Brief description or excerpt of the news article.</p>
                                <a href="#" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
    })
    .catch(error => {
        console.error('Error loading page:', error);
    });;

});
