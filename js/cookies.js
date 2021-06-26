function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
    c_value = null;
  } else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}

checkSession();

function checkSession() {
  var c = getCookie("visited");
  if (c === "yes") {
  } else {
    // body.classList.add("modalIsOpen");
    const mainArea = document.querySelector("main");
    const banner = document.createElement("div");
    banner.classList.add("bannerHero");

    const bannerBackdrop = document.createElement("div");
    bannerBackdrop.classList.add("bannerHero__backdrop");

    const bannerContainer = document.createElement("div");
    bannerContainer.classList.add("banner__container");
    bannerContainer.innerHTML = setElementHero();

    bannerBackdrop.append(bannerContainer);

    banner.append(bannerBackdrop);

    mainArea.append(banner);
  }
  setCookie("visited", "yes", 7);
}

function setElementHero() {
  return `<div class="picture">
                <img src="./img/profile.png" alt="profile">
            </div>
            <div class="description">
                <h5 class="header">Hello! thank you for your visit!</h5>
                <p>Im Rizki Maulana Citra, the person who made this project. Get in touch with me!</p>
                <div class="social__list">
                    <a href="https://github.com/mlnzyx">
                    <img src="./icons/github-icon.svg"/>
                    </a>
                    <a href="https://linkedin.com/in/rizki-citra">
                    <img src="./icons/linkedin-icon.svg"/>
                    </a>
                    <a href="https://facebook.com/mlnzyx">
                    <img src="./icons/facebook-icon.svg"/>
                    </a>
                </div>
            </div>
            <div class="close__banner">
                <img src="./icons/close-icon.svg" class="close">
            </div>`;
}
