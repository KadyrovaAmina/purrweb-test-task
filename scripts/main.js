const cookiePopup = document.querySelector(".cookie");
const cookieBtns = document.querySelectorAll(".cookie__btns_btn");
const formBtn = document.querySelectorAll(".contact-sales__btn");
const formPopup = document.querySelector(".form-popup");
const inputs = Array.from(document.querySelectorAll("input"));
const formBtnSubmit = document.querySelector(".form__btn");
const closeBtn = document.querySelectorAll(".cookie__close-btn");

// for cookie
const showCookiePopup = () => {
  cookiePopup.classList.add("show");
  cookieBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      cookiePopup.classList.remove("show");
    });
  });
};

window.addEventListener("load", showCookiePopup);

// for form
formBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    formPopup.classList.add("active");
  });
});

// inputs check
function isValidForm() {
  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  });
}

formBtnSubmit.addEventListener("click", isValidForm);

closeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    cookiePopup.classList.remove("show");
  });
});