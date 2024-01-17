var outsideClick = function (e) {
   var container = document.querySelectorAll(".customDrp")
   if (!container.matches(e.target) && container.contains(e.target) && container.matches(':visible')) {
      container.removeClass("active");
      document.addEventListener("click", outsideClick);
   }
};

// onclick="crossStringClick(this);return false;"
var crossStringClick = function (elem) {
   var target = elem;
   var parentWithActiveClass = target.closest('.active');
   if (parentWithActiveClass) {
      parentWithActiveClass.classList.remove("active");
   }
};

var searchstandard = '';
(function () {
   fetch("/data/v1/json/trending", {
      method: "GET",
   })
      .then((res) => res.json())
      .then((res) => {

         if (!res) return;

         populateTrendingSearch1(res);
         populateTrendingSearch2(res);
      })
      .catch((error) => console.log(error));
})();

function populateTrendingSearch1(res) {
   var html = `<p>
					Trending
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="16px" width="16px" viewBox="0 0 24 24" color="#FF775F" class="sc-aef7b723-0 hDNBzx">
						<path d="M17.0881 9.42254C16.4368 8.90717 15.8155 8.35512 15.3012 7.71336C12.3755 4.06357 13.8912 1 13.8912 1C8.46026 3.18334 7.22337 6.64895 7.16462 9.22981L7.1675 9.2572C7.1675 9.2572 7.21498 10.7365 7.90791 12.3625C8.12481 12.8713 7.88299 13.4666 7.33195 13.6199C6.87638 13.7465 6.40822 13.5317 6.21571 13.1314C5.90413 12.4831 5.49262 11.4521 5.6109 10.7249C4.75064 11.817 4.1815 13.1452 4.03542 14.6184C3.65092 18.4924 6.43759 22.0879 10.4208 22.8488C14.9906 23.7217 19.3121 20.7182 19.9269 16.3623C20.3117 13.6367 19.1498 11.0538 17.0881 9.42254ZM14.3578 17.7393C14.3289 17.776 13.5893 18.6597 12.3501 18.7517C12.2829 18.7547 12.2124 18.7577 12.1452 18.7577C11.2902 18.7577 10.4226 18.3682 9.56103 17.5951L9.37219 17.4262L9.61243 17.3372C9.62843 17.3312 11.2742 16.7236 11.6778 15.4077C11.8155 14.9629 11.7707 14.4566 11.553 13.9842C11.2905 13.4075 10.7845 11.9564 11.7453 10.9041L11.9309 10.7015L12.0206 10.9561C12.0238 10.9714 12.6034 12.5911 13.9741 13.4379C14.3871 13.6957 14.6977 14.0086 14.8931 14.3644C15.2959 15.1132 15.533 16.3065 14.3578 17.7393Z"></path>
					</svg>
				</p>`;
   html += `<div class="Listingdiv hide-overflow-line">`;

   res.forEach((data, index) => {
      html += `<div class="commonFlex contentBetween itemscenter spacer positionRelative">
									<a href="${CURRLANG}currencies/${data.slug}/" class="positonedLink"></a>
									<div class="left commonFlex itemscenter">
										<img class="rounded-8" src="/assets/currencies/32x32/${data.id}.png" alt="">
										<div class="title">${data.name}</div>
										<span>${data.symbol}</span>
									</div>
									<div class="right">
										<small>#${data.rank}</small>
									</div>
								</div>`;
   });

   html += `</div>`;

   document.getElementById('searchresbox1').innerHTML = html;
}

function populateTrendingSearch2(res) {
   var html = `<p class="trendText">Trending <img src="/assets/images/common/TrendingIcon.png" alt=""> </p>`;

   res.forEach((data, index) => {
      html += `<div class="commonFlex contentBetween itemscenter spacer positionRelative">
			<a href="${CURRLANG}currencies/${data.slug}/" class="positonedLink"></a>
			<div class="left commonFlex itemscenter">
				<img src="/assets/currencies/32x32/${data.id}.png" alt="">
				<div class="title">${data.name}</div>
				<span>${data.symbol}</span>
			</div>
			<div class="right">
				<small>#${data.rank}</small>
			</div>
		</div>`;
   });

   document.getElementById('searchresbox2').innerHTML = html;
}

var searchToken = function (e) {
   var skey = e.target.value;
   fetch("/data/v1/json/search?key=" + encodeURIComponent(skey), {
      method: "GET",
   })
      .then((res) => res.json())
      .then((res) => {
         buildSearchList(e.target.id, skey, res);
      })
      .catch((error) => console.log(error));
};

var clearSearch = function (id) {
   document.getElementById(id).value = '';
   buildSearchList(id, '', []);
};

function buildSearchList(resid, skey, list) {

   var output = null;
   if (resid == 'tokensearch1') {
      outputbox = 'searchresbox1';
   } else {
      outputbox = 'searchresbox2';
   }

   if (searchstandard == '') {
      searchstandard = document.getElementById(outputbox).innerHTML;
   }

   if (skey == '') {
      document.getElementById(outputbox).innerHTML = searchstandard;
      return false;
   }

   if (list.length == 0) {
      document.getElementById(outputbox).innerHTML = `<div class="search_noresults"><p>No results for '` + skey + `'</p><p>We couldn't find anything matching your search. Try again with a different term.</p></div>`;
      return false;
   }

   var html = '<p>Cryptocurrencies</p>';
   html += '<div class="Listingdiv hide-overflow-line">';

   list.forEach((data, index) => {
      html += `<div class="commonFlex contentBetween itemscenter spacer positionRelative">
					<a href="${CURRLANG}currencies/${data.slug}/" class="positonedLink"></a>
					<div class="left commonFlex itemscenter">
						<img class="rounded-8" src="/assets/currencies/64x64/${data.id}.png" alt="">
						<div class="title">${data.name}</div>
						<span>${data.symbol}</span>
					</div>
					<div class="right">
						<small>#${data.rank}</small>
					</div>
				</div>`;
   });

   html += '</div>';
   document.getElementById(outputbox).innerHTML = html;
}

(function () {
   window.scrollTo(0, 0);

   document.querySelectorAll(".menuIcon").forEach(function (menuIcon) {
      menuIcon.addEventListener("click", function () {
         document.querySelector(".headerMain").classList.add("active");
         document.body.style.overflow = 'hidden';
      });
   });

   document.querySelectorAll(".CloseMenu").forEach(function (closeMenu) {
      closeMenu.addEventListener("click", function () {
         document.querySelector(".headerMain").classList.remove("active");
         document.body.style.overflow = 'auto';
      });
   });

   document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
         const customPopupActive = document.querySelector(".customPopup.active");
         if (customPopupActive != null) {
            customPopupActive.classList.remove("active");
            document.body.style.overflow = 'auto';
         }
      }
   });

   const el1 = document.getElementById("tokensearch1")
   if (el1) {
      el1.addEventListener("input", searchToken);
   }
   const el2 = document.getElementById("tokensearch2")
   if (el2) {
      el2.addEventListener("input", searchToken);
   }

})();

//new
document.addEventListener('DOMContentLoaded', function () {

   document.getElementsByClassName('custmonDropDwon').addEventListener('click',
      (event) => {
         if (event.target.classList.contains('crossString') || event.target.classList.contains('bowiro'))
            return false;

         if (event.target.matches('a'))
            return true;

         event.preventDefault();

         console.log(event.target);

         if (event.target.classList.contains("language") || event.target.parentNode.classList.contains("language")) {
            languageFunc();
         }

         if (window.matchMedia('(max-width: 1170px)').matches) {
            document.body.style.overflow = 'hidden';
         }

         if (event.target.classList.contains("searchCoinDrp")) {
            document.getElementById('tokensearch1').focus();
         }



         if (this.nextElementSibling.classList.contains("customDrp")) {
            this.nextElementSibling.classList.add("active");

         } else {
            this.children.classList.add("active");
         }

         event.stopPropagation();
         document.addEventListener("click", outsideClick);
      })
})

function setCookie(name, value, days) {
   var expires = "";
   if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
   }
   document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
   }
   return null;
}

function eraseCookie(name) {
   document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function findParentNodeWithClass(childNode, targetClass) {
   let parentNode = childNode.parentNode;
   while (parentNode) {
      if (parentNode.classList.contains(targetClass)) {
         return parentNode;
      }
      parentNode = parentNode.parentNode;
   }
   return null;
}

// == === === currencies page == == == //

function changespp(rows) {

   var curr = document.getElementById('spp_current').value;
   if (curr == rows) {
      return;
   }

   setCookie('cspp', rows, 100 * 365);
   top.location.reload();
}

// == === === user registration script == == == //

// signUpFunc script
(function () {
   let successPopup = document.querySelector(".successPopup");
   let successformMsg = document.querySelector(".success-form-msg");

   let formMsg = document.getElementById("signup_error");

   let signUpBox = document.querySelector("#signUpFrom");

   signUpBox.addEventListener("submit", (event) => {
      event.preventDefault();

      let formData = new FormData(signUpBox);
      let plainFormData = Object.fromEntries(formData.entries());
      let formDataJsonString = JSON.stringify(plainFormData);
      fetch("/account/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: formDataJsonString,
      })
         .then((res) => res.json())
         .then((res) => {
            if (res.success) {
               successPopup.classList.add("active");
               document.querySelector("#signUpBox").classList.remove("active");
            } else if (res.error) {
               formMsg.style.display = "block";
               formMsg.innerHTML = res.error;
            } else {
               console.log("unknown situation:", res);
            }
         })
         .catch((error) => console.log(error));
   });
})();


function closePopup() {
   document.querySelector(".successPopup").classList.remove("active");
}


// loginFunc scripts
(function () {
   let formMsg = document.getElementById("login_error");

   let userLoginForm = document.querySelector("#userLoginForm");
   userLoginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let formData = new FormData(userLoginForm);
      let plainFormData = Object.fromEntries(formData.entries());
      let formDataJsonString = JSON.stringify(plainFormData);
      fetch("/account/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: formDataJsonString,
      })
         .then((res) => res.json())
         .then((res) => {
            if (res.success) {
               top.location.reload();
               document.querySelector("#LoginBox").classList.remove("active");
            } else if (res.error) {
               formMsg.style.display = "block";
               formMsg.innerHTML = res.error;
            } else {
               console.log("unknown situation:", res);
            }
         })
         .catch((error) => console.log(error));
   });
})();

// loginFunc scripts
(function () {
   let formMsg = document.getElementById("fpass_error");

   let fpassForm = document.querySelector("#from_reset_password");
   fpassForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let formData = new FormData(fpassForm);
      let plainFormData = Object.fromEntries(formData.entries());
      let formDataJsonString = JSON.stringify(plainFormData);
      fetch("/account/resetpasswd", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: formDataJsonString,
      })
         .then((res) => res.json())
         .then((res) => {
            if (res.success) {
               document.querySelector("#ResetPassword").classList.remove("active");
            } else if (res.error) {
               formMsg.style.display = "block";
               formMsg.innerHTML = res.error;
            } else {
               console.log("unknown situation:", res);
            }
         })
         .catch((error) => console.log(error));
   });
})();


function loginPswrdFunc() {
   var x = document.getElementById("loginPsWrdChnage");
   if (x.type === "password") {
      x.type = "text";
   } else {
      x.type = "password";
   }
}

function signInPswrdFunc() {
   var x = document.getElementById("signinPswrdChange");
   if (x.type === "password") {
      x.type = "text";
   } else {
      x.type = "password";
   }
}

// logout function
function logout() {
   fetch("/account/logout", {
      method: "GET",
   })
      .then((res) => res.json())
      .then((res) => {
         if (res.success) {
            top.location.reload();
         } else if (res.error) {
            console.log(res.error);
         } else {
            console.log("unknown situation:", res);
         }
      })
      .catch((error) => console.log(error));
}

// == === === end user registration script == == == //


// == === === start currency list == == == //
var currencyJson = null;

let currencyFunc = async function () {

   if (currencyJson == null) {
      await fetchCurrencyJson();
   }

   buildCurrencyList()
}

async function fetchCurrencyJson() {
   if (currencyJson == null) {
      try {
         const response = await fetch("/data/v1/json/currencies");
         currencyJson = await response.json();
      } catch (err) {
         console.log(err);
      }
   }
}

function buildCurrencyList(required_char = '') {
   required_char = required_char.toLowerCase();

   let html = "";
   currencyJson.popular.forEach((data, index) => {
      if (required_char != '' && data.name.toLowerCase().indexOf(required_char) === -1)
         return;

      var insertsymbol = '';
      if (data.symbol.toLowerCase() != 'usd') {
         insertsymbol = '/' + data.symbol.toLowerCase();
      }
      var locurl = CURLANGONLY.slice(0, -1) + insertsymbol + CURPATH;
      console.log(locurl);
      html += `<div class="flexCountry commonFlex itemscenter` + (CURRCURRENCY == data.ukey ? ' active' : '') + `" onclick="top.location='${locurl}';">
					<img src="` + (data.crypto == 1 ? '/assets/currencies/32x32/' + data.id + '.png' : '/assets/fiats/' + data.symbol + '.svg') + `" alt="">
					<div class="rightText"><span>${data.name}</span><br> <small class="textUpperCase">${data.symbol} ` + ((data.csymbol != null && data.csymbol != '' && data.symbol != data.csymbol) ? ' - ' + data.csymbol : '') + `</small></div>
					</div>`;
   });
   document.getElementById("popuplarCurrencies").innerHTML = html;

   html = "";
   currencyJson.btcunits.forEach((data, index) => {
      if (required_char != '' && data.name.toLowerCase().indexOf(required_char) === -1)
         return;

      var insertsymbol = '';
      if (data.symbol.toLowerCase() != 'usd') {
         insertsymbol = '/' + data.symbol.toLowerCase();
      }
      var locurl = CURLANGONLY.slice(0, -1) + insertsymbol + CURPATH;
      html += `<div class="flexCountry commonFlex itemscenter` + (CURRCURRENCY == data.ukey ? ' active' : '') + `" onclick="top.location='${locurl}';">
					<img src="` + (data.crypto == 1 ? '/assets/currencies/32x32/' + data.id + '.png' : '/assets/fiats/' + data.symbol + '.svg') + `" alt="">
					<div class="rightText"><span>${data.name}</span><br> <small class="textUpperCase">${data.symbol} ` + ((data.csymbol != null && data.csymbol != '' && data.symbol != data.csymbol) ? ' - ' + data.csymbol : '') + `</small></div>
					</div>`;
   });
   document.getElementById("BitCounCurrencies").innerHTML = html;

   html = "";
   currencyJson.fiats.forEach((data, index) => {
      if (required_char != '' && data.name.toLowerCase().indexOf(required_char) === -1)
         return;

      var insertsymbol = '';
      if (data.symbol.toLowerCase() != 'usd') {
         insertsymbol = '/' + data.symbol.toLowerCase();
      }
      var locurl = CURLANGONLY.slice(0, -1) + insertsymbol + CURPATH;
      html += `<div class="flexCountry commonFlex itemscenter` + (CURRCURRENCY == data.ukey ? ' active' : '') + `" onclick="top.location='${locurl}';">
					<img src="` + (data.crypto == 1 ? '/assets/currencies/32x32/' + data.id + '.png' : '/assets/fiats/' + data.symbol + '.svg') + `" alt="">
					<div class="rightText"><span>${data.name}</span><br> <small class="textUpperCase">${data.symbol} ` + ((data.csymbol != null && data.csymbol != '' && data.symbol != data.csymbol) ? ' - ' + data.csymbol : '') + `</small></div>
					</div>`;
   });
   document.getElementById("fiatCurrencies").innerHTML = html;

   html = "";
   currencyJson.cryptos.forEach((data, index) => {
      if (required_char != '' && data.name.toLowerCase().indexOf(required_char) === -1)
         return;

      var insertsymbol = '';
      if (data.symbol.toLowerCase() != 'usd') {
         insertsymbol = '/' + data.symbol.toLowerCase();
      }
      var locurl = CURLANGONLY.slice(0, -1) + insertsymbol + CURPATH;
      html += `<div class="flexCountry commonFlex itemscenter` + (CURRCURRENCY == data.ukey ? ' active' : '') + `" onclick="top.location='${locurl}';">
					<img src="` + (data.crypto == 1 ? '/assets/currencies/32x32/' + data.id + '.png' : '/assets/fiats/' + data.symbol + '.svg') + `" alt="">
					<div class="rightText"><span>${data.name}</span><br> <small class="textUpperCase">${data.symbol} ` + ((data.csymbol != null && data.csymbol != '' && data.symbol != data.csymbol) ? ' - ' + data.csymbol : '') + `</small></div>
					</div>`;
   });
   document.getElementById("cryptosCurrencies").innerHTML = html;
}

var currency_sField = document.getElementById('currency_sField');
currency_sField.addEventListener('input', function () {
   buildCurrencyList(currency_sField.value);
});
// == === === end currency list == == == //


// == === === start currency list == == == //

var languageJson = null;

let languageFunc = async function () {

   if (languageJson == null) {
      await fetchLanguageJson();
   }

   buildLanguageList()
}

async function fetchLanguageJson() {
   if (languageJson == null) {
      try {
         const response = await fetch("/data/v1/json/languages");
         languageJson = await response.json();
      } catch (err) {
         console.log(err);
      }
   }
}

function buildLanguageList(required_char = '') {
   required_char = required_char.toLowerCase();

   html = "";
   languageJson.forEach((data, index) => {
      if (required_char != '' && data.name_dest.toLowerCase().indexOf(required_char) === -1)
         return;

      html += `<li class="commonFlex itemscenter"><a href="` + (data.code == 'en' ? CURPATHCUR : '/' + data.code + CURPATHCUR) + `" class="commonFlex itemscenter contentBetween flexLink"><span class="title">${data.name_dest}</span> <img class="flag" src="/assets/langflags/` + data.code + `.svg" alt=""></a></li>`;
   });
   document.getElementById("langlist").innerHTML = html;
}

var language_sField = document.getElementById('language_sField');
language_sField.addEventListener('input', function () {
   buildLanguageList(language_sField.value);

});
// == === === end currency list == == == //

// == == == faq scripts == == == //
document.querySelectorAll(".faqAcc .flexAccHead").forEach(function (element) {
   element.addEventListener('click', function () {
      let clicked = this;
      let parentElement = clicked.parentElement;
      let siblings = Array.from(parentElement.parentElement.children).filter(
         function (sibling) {
            return sibling !== parentElement;
         }
      );
      let siblingsChildren = siblings.flatMap(function (sibling) {
         return Array.from(sibling.children);
      });

      siblingsChildren.forEach(function (child) {
         child.classList.remove('active');
      })


      let ancestor = findAncestor(this, 'li', 'faqAcc');
      let faqDescElements = ancestor.querySelectorAll('.faqDesc');

      ;
      setTimeout(function () {
         faqDescElements.forEach(function (faqDescElement) {
            faqDescElement.classList.add('active');
         })
      }, 2000)
   });
});

function findAncestor(element, targetClass, stopClass) {
   while (element && !element.classList.contains(stopClass)) {
      if (element.classList.contains(targetClass)) {
         return element;
      }
      element = element.parentElement;
   }
   return null;
}

// == === == faq scripts == == == //


// articles slider Scripts
var swiper = new Swiper(".thumbsBoxes", {
   spaceBetween: 10,
   slidesPerView: 4,
   direction: 'vertical',
   // freeMode: true,
   // loop: true,
   watchSlidesProgress: true,
   autoplay: {
      delay: 2500,
      disableOnInteraction: false,
   },
});
var swiper2 = new Swiper(".largeImages_1", {
   loop: true,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },
   autoplay: {
      delay: 2500,
      disableOnInteraction: false,
   },
   thumbs: {
      wiper: swiper,
   },
});
var swiper3 = new Swiper(".largeImages_2", {
   loop: true,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },
   autoplay: {
      delay: 2500,
      disableOnInteraction: false,
   }
});
// articles slider Scripts


// ================= currencies show

function addtowatchlist(id, target) {

}

function sharetoken(id) {

}

// ================= charts

var chart_data = 'price';
var chart_view = '1D';

function chart_switchdata(id, elem) {

   if (event.target.classList.contains('switch-price')) {
      if (chart_data == 'price') return;
      chart_data = 'price';
   } else {
      if (chart_data == 'marketcap') return;
      chart_data = 'marketcap';
   }

   for (var a in elem.children) {
      if (elem.children.hasOwnProperty(a)) {
         elem.children[a].classList.remove('active');
      }
   }

   event.target.classList.add('active');
   setToPlot(chart_data);
}

function chart_switchview(id, elem) {

   if (event.target.innerText == chart_view) {
      return false;
   }

   chart_view = event.target.innerText;

   for (var a in elem.children) {
      if (elem.children.hasOwnProperty(a)) {
         elem.children[a].classList.remove('active');
      }
   }

   event.target.classList.add('active');
   setTimeFrame(chart_view);
}


// ==================== calc

function calculateCoinprice(id) {
   var base = document.getElementById('calculator_from');
   var quote = document.getElementById('calculator_to');

   if (id == 'calculator_from') {
      quote.value = priceBeautiful(base.value * currentCoinPrice);
   } else {
      base.value = priceBeautiful(quote.value / currentCoinPrice);
   }
}

function priceBeautiful(input) {
   price = input.toString();
   if (price === '') return 0;

   const dot = price.indexOf('.');
   if (dot === -1) {
      if (price == 0) {
         return 0;
      }
      return Number(price).toFixed(2);
   }

   if (dot > 1) {
      var dec = 2;
   } else {
      if (price.charAt(0) === '0') {
         var add = 0;
         var s = 1;
         while (price.charAt(dot + s) === '0') {
            add += 1;
            s += 1;
         }
         var dec = 4 + add;
      } else if (price.charAt(0) === '1') {
         var dec = 4;
      } else {
         var dec = 2;
      }
   }

   return Number(price).toFixed(dec);
}

var toggleChartRightBtn = null;
function toggleChartRight(elem) {
   if (toggleChartRightBtn === null) {
      toggleChartRightBtn = elem.innerText;
   }

   var currentstate = elem.innerText;
   var alternate = elem.dataset.alternate;

   if (currentstate == alternate) {
      document.getElementById('chartRightHide').style.display = 'none';
      elem.innerHTML = toggleChartRightBtn;
   } else {
      document.getElementById('chartRightHide').style.display = 'block';
      elem.innerHTML = alternate;
   }
}

// ------------- toggleCurrencyMoreData ---------------
var toggleCurrencyMoreDataState = null;

function toggleCurrencyMoreData(elem) {
   if (toggleCurrencyMoreDataState === null) {
      toggleCurrencyMoreDataState = elem.innerText;
   }

   var currentstate = elem.innerText;
   var alternate = elem.dataset.alternate;

   if (currentstate == alternate) {
      $(".currencyDetail .bottomListing").css("display", "none");
      elem.innerHTML = toggleCurrencyMoreDataState;
   } else {
      $(".currencyDetail .bottomListing").css("display", "block");
      elem.innerHTML = alternate;
   }
}



var path = window.location.href;
let bodytag = document.querySelector("body")
let lang_div = document.getElementById("lang_div")
if (path.includes("ar") && path.includes("")) {
   bodytag.classList.add("arbicrtl");
}
else {
   bodytag.classList.remove("arbicrtl")
}



