(function() {

  /* ====================
  Preloader
  ======================= */
  window.onload = function () {
    window.setTimeout(fadeout, 300);
  }

  function fadeout() {
    var preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.display = 'none';
    } else {
      console.warn('No se encontró el elemento .preloader');
      // ❌ No recargar, simplemente no hacer nada
    }
  }

  // =========== sticky menu 
  window.onscroll = function () {
    var header_navbar = document.querySelector(".hero-section-wrapper-5 .header");
    if (header_navbar) {
      var sticky = header_navbar.offsetTop;

      if (window.pageYOffset > sticky) {
        header_navbar.classList.add("sticky");
      } else {
        header_navbar.classList.remove("sticky");
      }
    }

    var backToTo = document.querySelector(".scroll-top");
    if (backToTo) {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        backToTo.style.display = "flex";
      } else {
        backToTo.style.display = "none";
      }
    }
  };

  // header-6 toggler-icon
  document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler6 = document.querySelector(".header-6 .navbar-toggler");
    const navbarCollapse6 = document.querySelector(".header-6 .navbar-collapse");

    if (!navbarToggler6 || !navbarCollapse6) {
      console.warn('No se encontraron elementos .navbar-toggler o .navbar-collapse dentro de .header-6');
      return;
    }

    document.querySelectorAll(".header-6 .page-scroll").forEach(e =>
      e.addEventListener("click", () => {
        navbarToggler6.classList.remove("active");
        navbarCollapse6.classList.remove('show');
      })
    );

    navbarToggler6.addEventListener('click', function() {
      navbarToggler6.classList.toggle("active");
    });
  });

  // section menu active
  function onScroll(event) {
    var sections = document.querySelectorAll('.page-scroll');
    var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
      var currLink = sections[i];
      var val = currLink.getAttribute('href');

      if (val && val.startsWith('#') && val.length > 1) {
        var refElement = document.querySelector(val);
        if (refElement) {
          var scrollTopMinus = scrollPos + 73;
          if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
            document.querySelector('.page-scroll.active')?.classList.remove('active');
            currLink.classList.add('active');
          } else {
            currLink.classList.remove('active');
          }
        }
      }
    }
  }

  window.document.addEventListener('scroll', onScroll);

  // WOW active
  if (typeof WOW !== 'undefined') {
    new WOW().init();
  }

})();
