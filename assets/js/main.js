const APPSCRIPT = "https://script.google.com/macros/s/AKfycbzkyqXUM5VcQT0cXP4APE8LyZLAWpR7jYgiPvTU1F4JZFtdnZZlXHrJiT6NRSEnQWmH3w/exec";

const fullPath = window.location.pathname;
const cleanPath = fullPath.replace(/^\/|\/$/g, '') || '/';
console.log(cleanPath);

async function loadData(cleanPath) {

  try {
    // นำ mode: 'no-cors' ออก เพื่อให้สามารถอ่าน json ได้
    const res = await fetch(`${APPSCRIPT}?id=${encodeURIComponent(cleanPath)}`);

    // ตรวจสอบว่า Response โอเคไหม
    if (!res.ok) throw new Error('Network response was not ok');

    const data = await res.json();

    const list = document.getElementById('content-list');

    const dataSort = data.sort((a, b) => b.timestamp - a.timestamp);
    // ปรับการ Mapping ข้อมูลตามโครงสร้างใหม่ (ชื่อ, สกุล, ตำแหน่ง, หน่วยงาน, รอบ)
    list.innerHTML = dataSort.length ? dataSort.map(i => `
                    ${i.content}
                `).join('') : '';

    executeScripts(list);

  } catch (e) {
    // alert("ไม่สามารถดึงข้อมูลได้: " + e.message);
  } finally {
    // btn.disabled = false;
    // btn.innerHTML = "ค้นหา";
  }
}
function executeScripts(container) {
    const scripts = container.querySelectorAll("script");
    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        
        // คัดลอก attributes ทั้งหมด (เช่น src, type)
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        // คัดลอกเนื้อหาภายในสคริปต์ (inline script)
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        
        // แทนที่ของเดิมเพื่อให้เบราว์เซอร์ประมวลผลใหม่
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}
/**
* Template Name: Blogy
* Template URL: https://bootstrapmade.com/blogy-bootstrap-blog-template/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();