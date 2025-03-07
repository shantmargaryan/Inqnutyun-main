const mainBtn = document.querySelector(".main__btn");
document.addEventListener('scroll', function () {
    if (window.scrollY >= 700) {
        mainBtn.classList.remove('hidden');
    } else {
        mainBtn.classList.add('hidden');
    }
});

mainBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})