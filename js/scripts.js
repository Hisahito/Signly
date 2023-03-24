/* Description: Custom JS file */

/* Navigation */
// Collapse the navbar by adding the top-nav-collapse class
window.onscroll = function () {
	scrollFunction();
	scrollFunctionBTT(); // back to top button
};

window.onload = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.documentElement.scrollTop > 30) {
		document.getElementById("navbarExample").classList.add("top-nav-collapse");
	} else if ( document.documentElement.scrollTop < 30 ) {
		document.getElementById("navbarExample").classList.remove("top-nav-collapse");
	}
}

// Navbar on mobile
let elements = document.querySelectorAll(".navbar-nav .nav-link:not(.dropdown-toggle)");

for (let i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", () => {
		document.querySelector(".offcanvas-collapse").classList.toggle("open");
	});
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
  	document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

// Hover on desktop
function toggleDropdown(e) {
	const _d = e.target.closest(".dropdown");
	let _m = document.querySelector(".dropdown-menu", _d);

	setTimeout(
		function () {
		const shouldOpen = _d.matches(":hover");
		_m.classList.toggle("show", shouldOpen);
		_d.classList.toggle("show", shouldOpen);

		_d.setAttribute("aria-expanded", shouldOpen);
		},
		e.type === "mouseleave" ? 300 : 0
	);
}

// On hover
const dropdownCheck = document.querySelector('.dropdown');

if (dropdownCheck !== null) { 
	document.querySelector(".dropdown").addEventListener("mouseleave", toggleDropdown);
	document.querySelector(".dropdown").addEventListener("mouseover", toggleDropdown);

	// On click
	document.querySelector(".dropdown").addEventListener("click", (e) => {
		const _d = e.target.closest(".dropdown");
		let _m = document.querySelector(".dropdown-menu", _d);
		if (_d.classList.contains("show")) {
			_m.classList.remove("show");
			_d.classList.remove("show");
		} else {
			_m.classList.add("show");
			_d.classList.add("show");
		}
	});
}


/* Image Slider - Swiper */
var imageSlider = new Swiper('.image-slider', {
	autoplay: {
		delay: 2000,
		disableOnInteraction: false
	},
	loop: true,
	spaceBetween: 30,
	slidesPerView: 5,
	breakpoints: {
		// when window is <= 575px
		575: {
			slidesPerView: 1,
			spaceBetween: 10
		},
		// when window is <= 767px
		767: {
			slidesPerView: 2,
			spaceBetween: 20
		},
		// when window is <= 991px
		991: {
			slidesPerView: 3,
			spaceBetween: 20
		},
		// when window is <= 1199px
		1199: {
			slidesPerView: 4,
			spaceBetween: 20
		},

	}
});


/* Text Slider - Swiper */
var textSlider = new Swiper('.text-slider', {
	autoplay: {
		delay: 6000,
		disableOnInteraction: false
	},
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
});


/* Video Modal */
var videoBtn = document.querySelector('.video-btn')
var videoModal = document.getElementById('videoModal')
var video = document.getElementById('video')
var videoSrc

var checkVideoSrc = document.querySelector('.video-btn');
if (checkVideoSrc !== null) { 
	videoBtn.addEventListener('click',function(e){
		videoSrc = videoBtn.getAttribute('data-bs-src')
	})
}

var checkVideoModal = document.getElementById('videoModal');
if (checkVideoModal !== null) { 
	videoModal.addEventListener('shown.bs.modal',(e)=>{
		video.setAttribute('src', videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0')
	})

	videoModal.addEventListener('hide.bs.modal',(e)=>{
		video.setAttribute('src', videoSrc)
	})
}


/* Back To Top Button */
// Get the button
myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunctionBTT() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		myButton.style.display = "block";
	} else {
		myButton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}

// words animations
var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
	this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
	var delta = 100 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
	delta = this.period;
	this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
	this.isDeleting = false;
	this.loopNum++;
	delta = 500;
	}

	setTimeout(function() {
	that.tick();
	}, delta);
};

window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
	for (var i=0; i<elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
		  new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid white}";
	document.body.appendChild(css);
};

document.addEventListener("DOMContentLoaded", () => {
// Selecciona el formulario de solicitud de restablecimiento de contraseña
const resetPasswordRequestForm = document.getElementById("reset-password-request-form");

// Agrega un event listener al formulario para manejar el evento de envío
resetPasswordRequestForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Obtén el valor del campo de correo electrónico
  const emailField = document.getElementById("floatingInput1");
  const email = emailField.value;

  // Realiza una solicitud POST al backend para solicitar el restablecimiento de contraseña
  try {
    const response = await fetch("http://localhost:3000/api/auth/reset-password-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      // Muestra un mensaje de éxito si la solicitud se envió correctamente
      alert("Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña.");
    } else {
      // Muestra un mensaje de error si hubo un problema
      alert("Hubo un error al solicitar el restablecimiento de contraseña. Por favor, inténtalo de nuevo.");
    }
  } catch (error) {
    console.error(error);
    alert("Hubo un error al solicitar el restablecimiento de contraseña. Por favor, inténtalo de nuevo.");
  }
})
});

document.addEventListener("DOMContentLoaded", () => {
	// Selecciona el formulario de restablecimiento de contraseña
	const resetPasswordForm = document.getElementById("reset-password-form");
  
	// Agrega un event listener al formulario para manejar el evento de envío
	resetPasswordForm.addEventListener("submit", async (event) => {
	  event.preventDefault();
  
	  // Obtén el valor de los campos de nueva contraseña y confirmación de contraseña
	  const newPasswordField = document.getElementById("new-password");
	  const confirmPasswordField = document.getElementById("confirm-password");
	  const newPassword = newPasswordField.value;
	  const confirmPassword = confirmPasswordField.value;
  
	  // Verifica que las contraseñas coincidan
	  if (newPassword !== confirmPassword) {
		alert("Las contraseñas no coinciden. Por favor, verifica e inténtalo de nuevo.");
		return;
	  }
  
	  // Recupera el token desde la URL
	  const urlParams = new URLSearchParams(window.location.search);
	  const token = urlParams.get("token");
  
	  // Realiza una solicitud POST al backend para restablecer la contraseña
	  try {
		const response = await fetch(`http://localhost:3000/api/auth/reset-password/${token}`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({ password: newPassword }),
		});
  
		if (response.ok) {
		  // Muestra un mensaje de éxito si la contraseña se restableció correctamente
		  alert("Tu contraseña ha sido restablecida con éxito.");
		  window.location.href = "/login"; // Redirige al usuario a la página de inicio de sesión
		} else {
		  // Muestra un mensaje de error si hubo un problema
		  alert("Hubo un error al restablecer tu contraseña. Por favor, inténtalo de nuevo.");
		}
	  } catch (error) {
		console.error(error);
		alert("Hubo un error al restablecer tu contraseña. Por favor, inténtalo de nuevo.");
	  }
	})
});
  
