let sin = document.getElementById("in");
let sup = document.getElementById("up");

sup.addEventListener("mouseover", function () {
  sin.classList.remove("btn-dark");
  sup.classList.add("btn-dark");
});

sin.addEventListener("mouseover", function () {
  sup.classList.remove("btn-dark");
  sin.classList.add("btn-dark");
});
