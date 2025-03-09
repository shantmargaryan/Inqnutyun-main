if (HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
    const specScript = document.createElement("script");
    specScript.type = "speculationrules";
    const specRules = {
        prerender: [
            {
                "urls": ["./index.html", "./gallery.html", "./fund.html", "./donation.html", "./contact.html"],
                "eagerness": "immediate"
            }
        ],
    };
    specScript.textContent = JSON.stringify(specRules);
    document.body.append(specScript);
}


const header = document.querySelector(".header");
const headerScroll = document.createElement("div");
const nav = document.querySelector(".navbar");
const videolibrary = document.querySelector(".videolibrary-content");
const videolibraryBtn = document.querySelector(".videolibrary");
const language = document.getElementById("language-content");
const languageBtn = document.querySelector(".menu-link-language");
const burger = document.querySelector(".burger");
const overlay = document.querySelector(".main__overlay");
const donationForm = document.querySelector(".donation__form");
const coinsBtn = document.querySelectorAll(".donation__coins");
const idramBtn = document.querySelectorAll(".donation__button-idram");
const loanguageIcon = document.querySelector(".menu-language-icon");
const donate = document.querySelector(".button-header")
const logo = document.querySelector(".logo-icon")
const logoText = document.querySelector(".logo-text")
const videoPlayIcon = document.querySelectorAll(".slider-ellipse__slide svg");
const details = document.querySelectorAll(".datalist");
const datalistIcon = document.querySelectorAll(".datalist__summary-icon");

details.forEach((detail) => {
    detail.addEventListener("click", (e) => {
        const summary = e.target.closest("summary");
        const icon = summary?.querySelector(".datalist__summary-icon");
        if (icon) {
            icon.classList.toggle("datalist__summary-icon_active");
        }
    });
});

document.body.addEventListener("click", (e) => {
    const parent = e.target.closest(".slider-ellipse__slide");
    const playIcon = e.target.closest(".slider-ellipse__slide svg");
    const parentPlayIcon = playIcon?.closest(".slider-ellipse__slide");
    const text = parentPlayIcon?.querySelector("span");
    const poster = parentPlayIcon?.querySelector(".slider-ellipse__slide-poster");
    const video = parentPlayIcon?.querySelector(".tab__video");

    if (playIcon) {
        playIcon.style.display = "none";
        poster.style.display = "none";
        text.style.display = "none";
        video.play();
    }

    const currentVideo = parent?.querySelector("video");
    // currentVideo?.addEventListener("pause", function () {
    //     currentVideo.pause();
    //     parent.querySelector("svg").style.display = "block";
    //     parent.querySelector("span").style.display = "block";
    //     parent.querySelector(".slider-ellipse__slide-poster").style.display =
    //         "block";
    // });

    currentVideo?.addEventListener("ended", function () {
        currentVideo.pause();
        parent.querySelector("svg").style.display = "block";
        parent.querySelector("span").style.display = "block";
        parent.querySelector(".slider-ellipse__slide-poster").style.display =
            "block";
    });
});


document.body.addEventListener("click", (e) => {
    if (e.target.closest(".menu-link-language")) {
        language.classList.toggle("language-content_active");
    } else if (e.target.closest(".language-content")) {
        language.classList.remove("language-content_active");
    }
    else {
        language.classList.remove("language-content_active");
    }
    if (e.target.closest(".videolibrary")) {
        videolibrary.classList.toggle("videolibrary-content_active");
    } else if (e.target.closest(".videolibrary-content")) {
        videolibrary.classList.remove("videolibrary-content_active");
    }
    else {
        videolibrary.classList.remove("videolibrary-content_active");
    }
});



headerScroll.setAttribute("data-scroll", "");
header.before(headerScroll);

const headerObserver = new IntersectionObserver((entries) => {
    header.classList.toggle("header__scroll", !entries[0].isIntersecting);
}, {
    rootMargin: "50px 0px 0px 0px",
});

headerObserver.observe(headerScroll);

document.body.addEventListener("click", (e) => {
    if (e.target === overlay) {
        burger.classList.remove("burger_active");
        nav.classList.remove("nav_active");
        header.classList.remove("header_active");
        overlay.classList.remove("main__overlay_active");
    }
});


burger.addEventListener("click", function () {
    burger.classList.toggle("burger_active");
    nav.classList.toggle("nav_active");
    if (burger.classList.contains("burger_active")) {
        header.classList.add("header_active")
        overlay.classList.add("main__overlay_active");
        logo.classList.add("logo-icon_active");
        logoText.classList.add("logo-text_active");
        donate.classList.add("button-header_active");
        loanguageIcon.classList.add("menu-link-language-icon_active");
        nav.style.paddingTop = header.offsetHeight + "px";
    } else {
        overlay.classList.remove("main__overlay_active");
        nav.style.paddingTop = "";
        header.classList.remove("header_active");
        logo.classList.remove("logo-icon_active");
        logoText.classList.remove("logo-text_active");
        donate.classList.remove("button-header_active");
        loanguageIcon.classList.remove("menu-link-language-icon_active");
    }
});

const mediaQueryMinWidth_1200 = window.matchMedia('(min-width: 992px)');
mediaQueryMinWidth_1200.addEventListener("change", (e) => {
    if (e.matches) {
        nav.style.paddingTop = "";
        overlay.classList.remove("main__overlay_active");
        burger.classList.remove("burger_active");
        nav.classList.remove("nav_active");
        header.classList.remove("header_active");
        logo.classList.remove("logo-icon_active");
        logoText.classList.remove("logo-text_active");
        donate.classList.remove("button-header_active");
        loanguageIcon.classList.remove("menu-link-language-icon_active");
        return true;
    }
    else {
        nav.style.paddingTop = header.offsetHeight + "px";
    }
    return false;
});

if (coinsBtn && idramBtn) {
    coinsBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.add("donation__coins_active");
            coinsBtn.forEach((item) => {
                if (item !== btn) {
                    item.classList.remove("donation__coins_active");
                }
            });
        });
    });

    idramBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.add("donation__idram_active");
            idramBtn.forEach((item) => {
                if (item !== btn) {
                    item.classList.remove("donation__idram_active");
                }
            });
        });
    });
}

if (document.querySelector(".mySwiper")) {
    const swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }, slidesPerView: 3,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 80
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 80
            }
        },
    });
}


function getScrollAnimation() {
    window.addEventListener("scroll", getScrollAnimation);
    const scrollAnim = document.querySelectorAll(".scroll-anim");
    if (scrollAnim.length > 0) {
        scrollAnim.forEach(animItem => {
            const { top, height } = animItem.getBoundingClientRect();
            const offset = window.scrollY + top
            const scrollAnimPoint = window.innerHeight - height / 20
            if (offset < window.scrollY + scrollAnimPoint && offset + height > window.scrollY) {
                animItem.classList.add("scroll-anim_active")
            } else {
                if (!animItem.classList.contains("scroll-anim_once")) {
                    animItem.classList.remove("scroll-anim_active")
                }
            }
        });
    }
};

setTimeout(getScrollAnimation, 400);



if (document.querySelector(".carousel")) {
    const swiper = new Swiper(".carousel", {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        initialSlide: 0,
        on: {
            click(event) {
                swiper.slideTo(this.clickedIndex);
            }
        },
        breakpoints: {
            0: {
                slidesPerView: 1.5,
            },
            768: {
                slidesPerView: 3,
            },
        }
    });
}




const readMoreBtn = document.querySelectorAll('.more-text-btn');
const dots = document.querySelectorAll('.dots');
const text = document.querySelectorAll('.show-text');

if (text) {
    readMoreBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            text[index].classList.toggle('show-more');
            if (readMoreBtn[index].innerText === 'Իմանալ ավելին') {
                readMoreBtn[index].innerText = 'Փակել ավելին';
            } else {
                readMoreBtn[index].innerText = 'Իմանալ ավելին';
            }
        });
    })
}

