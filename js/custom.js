/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

/* Toggle sidebar
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

/* Animate js*/

(function ($) {
  //Function to animate slider captions
  function doAnimations(elems) {
    //Cache the animationend event in a variable
    var animEndEv = "webkitAnimationEnd animationend";

    elems.each(function () {
      var $this = $(this),
        $animationType = $this.data("animation");
      $this.addClass($animationType).one(animEndEv, function () {
        $this.removeClass($animationType);
      });
    });
  }

  //Variables on page load
  var $myCarousel = $("#carouselExampleIndicators"),
    $firstAnimatingElems = $myCarousel
      .find(".carousel-item:first")
      .find("[data-animation ^= 'animated']");

  //Initialize carousel
  $myCarousel.carousel();

  //Animate captions in first slide on page load
  doAnimations($firstAnimatingElems);

  //Other slides to be animated on carousel slide event
  $myCarousel.on("slide.bs.carousel", function (e) {
    var $animatingElems = $(e.relatedTarget).find(
      "[data-animation ^= 'animated']"
    );
    doAnimations($animatingElems);
  });
})(jQuery);

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll(".fade-in-text");

  // Set up the Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Add class when visible
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the element is visible
  );

  // Observe each fade-in element
  fadeInElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("consultationForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset error messages
    document
      .querySelectorAll(".error-message")
      .forEach((msg) => (msg.style.display = "none"));

    let isValid = true;

    // Validate name
    const name = document.getElementById("name");
    if (!name.value.trim()) {
      name.nextElementSibling.style.display = "block";
      isValid = false;
    }

    // Validate surname
    const surname = document.getElementById("surname");
    if (!surname.value.trim()) {
      surname.nextElementSibling.style.display = "block";
      isValid = false;
    }

    // Validate age
    const age = document.getElementById("age");
    if (!age.value || age.value < 18 || age.value > 120) {
      age.nextElementSibling.style.display = "block";
      isValid = false;
    }

    // Validate business type
    const businessType = document.getElementById("businessType");
    if (!businessType.value) {
      businessType.nextElementSibling.style.display = "block";
      isValid = false;
    }

    // Validate business size
    const businessSize = document.querySelector(
      'input[name="businessSize"]:checked'
    );
    if (!businessSize) {
      document
        .querySelector('input[name="businessSize"]')
        .closest(".mb-3")
        .querySelector(".error-message").style.display = "block";
      isValid = false;
    }

    // Validate revenue
    const revenue = document.getElementById("revenue");
    if (!revenue.value || isNaN(revenue.value) || revenue.value < 0) {
      revenue.nextElementSibling.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      // Show success message
      alert(
        "Thank you! Your consultation booking has been submitted successfully."
      );
      // Close modal
      bootstrap.Modal.getInstance(
        document.getElementById("bookingModal")
      ).hide();
      // Reset form
      form.reset();
    }
  });

  // Add visual feedback on form interactions
  document.querySelectorAll(".form-control, .form-select").forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.transform = "translateY(-2px)";
    });

    input.addEventListener("blur", function () {
      this.style.transform = "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = new bootstrap.Carousel(
    document.getElementById("eventCarousel"),
    {
      interval: 30000, // 30 seconds
      pause: "hover",
      wrap: true,
    }
  );

  // Update page numbers
  const leftPageNumber = document.querySelector(".page-number-left");
  document
    .getElementById("eventCarousel")
    .addEventListener("slide.bs.carousel", function (event) {
      let currentPage = (event.to + 1).toString().padStart(2, "0");
      leftPageNumber.textContent = currentPage;
    });

  // Add sound effect on page turn (optional)
  document
    .getElementById("eventCarousel")
    .addEventListener("slide.bs.carousel", function () {
      // Uncomment below lines if you want to add page turn sound
      // const pageSound = new Audio('path-to-page-turn-sound.mp3');
      // pageSound.play();
    });
});
