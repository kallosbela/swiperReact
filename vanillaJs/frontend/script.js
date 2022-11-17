
// render

const getImages = async () => {
  const response = await fetch("http://localhost:3000/images");
  const images = await response.json();
  return images;
};

const makeImageComponent = (image) => {
  const result = `
    <div class="swiper-slide">
      <div>
        <span>
          <strong>${image.title}</strong> by ${image.photographer} <br>
          ${image.uploadDate}
        </span>
      </div>
      <img src=${image.url} alt="">
    </div>
    `
  return result;
};

const render = async () => {
  const images = await getImages();
  console.log(images);
  document.getElementsByClassName("swiper-wrapper")[0].innerHTML = images.map(makeImageComponent).join(" ");
  console.log(images.map(makeImageComponent));
};

const init = async () => {
  await render();

  const swiper = new Swiper(".swiper", {
    // Optional parameters
    speed: 400,
    spaceBetween: 100,
    direction: "horizontal",
    loop: true,
  
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },
  
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  
  



}

init()


