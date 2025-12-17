$(function () {
  const $navLinks = $(".site-nav a");
  const $menuToggle = $(".menu-toggle");
  const $siteNav = $(".site-nav");

  // Smooth scroll for same-page anchors
  $navLinks.on("click", function (e) {
    const target = $(this).attr("href");
    if (target.startsWith("#")) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top - 70,
        },
        600
      );
      $siteNav.removeClass("open");
    }
  });

  // Simple scroll spy to highlight active section
  const sections = $("section");
  $(window).on("scroll", function () {
    const scrollPos = $(document).scrollTop();
    sections.each(function () {
      const top = $(this).offset().top - 120;
      if (scrollPos >= top) {
        const id = $(this).attr("id");
        $navLinks.removeClass("active");
        $navLinks.filter(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  $menuToggle.on("click", function () {
    $siteNav.toggleClass("open");
  });

  $(".contact-form").on("submit", function (e) {
    e.preventDefault();
    alert("Thanks! You'll hear from me shortly.");
    this.reset();
  });

  $("#year").text(new Date().getFullYear());

  const processVideo = document.getElementById("process-video");
  // Only attempt poster capture if this is an actual <video> element
  if (processVideo && processVideo.tagName && processVideo.tagName.toLowerCase() === "video") {
    const capturePoster = () => {
      if (!(processVideo.videoWidth && processVideo.videoHeight)) return;
      const canvas = document.createElement("canvas");
      canvas.width = processVideo.videoWidth;
      canvas.height = processVideo.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(processVideo, 0, 0, canvas.width, canvas.height);
      try {
        processVideo.setAttribute("poster", canvas.toDataURL("image/png"));
      } catch (err) {
        console.error("Unable to capture video thumbnail:", err);
      }
    };

    if (processVideo.readyState >= 2) {
      capturePoster();
    } else {
      processVideo.addEventListener("loadeddata", capturePoster, { once: true });
    }
  }

  const $notes = $(".notes .note");
  const $noteDetail = $(".note-detail");
  $notes.on("click", function () {
    const detail = $(this).data("detail");
    $notes.removeClass("active");
    $(this).addClass("active");
    if ($noteDetail.length) {
      $noteDetail.addClass("updating");
      setTimeout(() => {
        $noteDetail.text(detail);
        $noteDetail.removeClass("updating");
      }, 120);
    }
  });

  AOS.init({
    once: false,
    duration: 900,
    offset: 80,
    easing: "ease-in-out",
  });
});
