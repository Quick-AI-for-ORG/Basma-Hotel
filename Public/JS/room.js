let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let slides = document.querySelectorAll(".room-image img");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }


  slides[slideIndex - 1].style.display = "block";
}

// Arrow controls
document.getElementById("prevArrow").addEventListener("click", function () {
  plusSlides(-1);
});

document.getElementById("nextArrow").addEventListener("click", function () {
  plusSlides(1);
});
