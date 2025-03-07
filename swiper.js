const slider = document.querySelector(".slider-ellipse");
const sliderContainer = document.querySelector(".slider-ellipse__container");
const slides = document.querySelectorAll(".slider-ellipse__slide");
const sliderNavigations = document.querySelectorAll(".slider-navigation");
const actionPrevious = document.querySelector(".action-prev");
const actionNext = document.querySelector(".action-next");
const sliderPagination = document.querySelector(".slider-ellipse__pagination");

let activeOrder = 0;
// Обработчики свайпа
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchmove", (e) => {
  touchEndX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchend", () => {
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // Минимальное расстояние для срабатывания свайпа
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      activeOrder = (activeOrder - 1 + slides.length) % slides.length;

    } else {
      activeOrder = (activeOrder + 1) % slides.length;
    }
    update();
  }
}
init();

function init() {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    slide.dataset.order = i;
    //slide.style.transform = `translate(-50%, -50%)`;
    slide.addEventListener("click", clickHandler);
    const paginationButton = document.createElement("button");
    paginationButton.classList.add("slider-ellipse__pagination-button");
    paginationButton.dataset.paginationOrder = i;
    sliderPagination.appendChild(paginationButton);
  }
  for (const navigation of sliderNavigations) {
    navigation.addEventListener("click", navigationHandler);
  }

  activeOrder = Math.floor(slides.length / 2);

  update();
}

function update() {
  const { width, height } = sliderContainer.getBoundingClientRect();
  //const slideRect = slides[0].getBoundingClientRect();
  const a = width / 2;
  const b = height / 2;

  const delta = Math.PI / slides.length / 2;

  for (let i = 0; i < slides.length; i++) {
    const leftSlide = document.querySelector(
      `[data-order="${activeOrder - i}"]`,
    );
    const leftPaginationButton = document.querySelector(
      `[data-pagination-order="${activeOrder - i}"]`,
    );
    if (leftSlide) {
      leftSlide.style.zIndex = slides.length - i;
      leftSlide.style.opacity = 1 - (4 * i) / slides.length;
      leftSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 - delta * i * 1.7)}px`;
      leftSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2)}px`;
      leftSlide.style.transform = `translate(-50%, -50%) scale(${1 - (1 * i) / slides.length})`;
      leftPaginationButton.style.transform = `scale(${1 - (1 * i) / slides.length + 0.2})`;
      leftPaginationButton.style.opacity = `${1 - (1 * i) / slides.length}`;
      //leftSlide.style.height = 570 - (570 * i) / slides.length + "px";
      //leftSlide.style.maxWidth = 1120 - (1120 * i) / slides.length + "px";
    }
    const rightSlide = document.querySelector(
      `[data-order="${activeOrder + i}"]`,
    );
    const rightPaginationButton = document.querySelector(
      `[data-pagination-order="${activeOrder + i}"]`,
    );
    if (rightSlide) {
      rightSlide.style.zIndex = slides.length - i;
      rightSlide.style.opacity = 1 - (4 * i) / slides.length;
      rightSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 + delta * i * 1.7)}px`;
      rightSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2)}px`;
      rightSlide.style.transform = `translate(-50%, -50%) scale(${1 - (1 * i) / slides.length})`;
      rightPaginationButton.style.transform = `scale(${1 - (1 * i) / slides.length + 0.2})`;
      rightPaginationButton.style.opacity = `${1 - (1 * i) / slides.length}`;
      //rightSlide.style.height = 570 - (570 * i) / slides.length + "px";
      //rightSlide.style.maxWidth = 1120 - (1120 * i) / slides.length + "px";
    }

    if (leftSlide && window.innerWidth < 768) {
      leftSlide.style.opacity = 1 - (6 * i) / slides.length;
      leftSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 - delta * i * 2)}px`;
    }
    if (rightSlide && window.innerWidth < 768) {
      rightSlide.style.opacity = 1 - (6 * i) / slides.length;
      rightSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 + delta * i * 2)}px`;
    }
  }
}

function clickHandler() {
  activeOrder = parseInt(this.dataset.order, 10);
  update();
}

function navigationHandler(e) {
  e.preventDefault();
  const { dir } = this.dataset;

  if (dir === "prev") {
    activeOrder = (activeOrder - 1 + slides.length) % slides.length;
  } else if (dir === "next") {
    activeOrder = (activeOrder + 1) % slides.length;
  }
  update();
}

window.addEventListener("resize", update);

function setPagination() {
  slides.forEach((slide) => {
    const paginationButton = document.querySelector(
      `[data-pagination-order="${slide.dataset.order}"]`,
    );
    if (paginationButton) {
      paginationButton.classList.remove(
        "slider-ellipse__pagination-button_active",
      );
    }
    if (slide.dataset.order === activeOrder.toString()) {
      paginationButton.classList.add(
        "slider-ellipse__pagination-button_active",
      );
    }
  });

  document
    .querySelectorAll(".slider-ellipse__pagination-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        activeOrder = parseInt(button.dataset.paginationOrder, 10);
        update();
      });
    });
}

setPagination();