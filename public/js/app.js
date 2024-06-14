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
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASF5IWGzjY1DKiEqx8Awn-vcExAfhdUbE",
  authDomain: "feed-news-app-ab616.firebaseapp.com",
  databaseURL: "https://feed-news-app-ab616-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "feed-news-app-ab616",
  storageBucket: "feed-news-app-ab616.appspot.com",
  messagingSenderId: "192503559869",
  appId: "1:192503559869:web:8cd14c9e8023be802369d4",
  measurementId: "G-0PD254KV58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

async function getData() {
    const dbRef = ref(database);
    try {
        const snapshot = await get(child(dbRef, 'data/feed-news'));
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            document.getElementById('data').innerText = JSON.stringify(data, null, 2);
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error("Error getting data:", error);
    }
}
getData();