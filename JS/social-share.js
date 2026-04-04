document.addEventListener("DOMContentLoaded", () => {

  const pageUrl = window.location.href;
  const pageTitle = document.title;

  document.querySelectorAll(".share-btn").forEach(btn => {

    btn.addEventListener("click", () => {

      const platform = btn.getAttribute("data-platform");
      let shareUrl = "";

      switch(platform){

        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
          break;

        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
          break;

        case "whatsapp":
          shareUrl = `https://api.whatsapp.com/send?text=${pageTitle} ${pageUrl}`;
          break;

        case "pinterest":
          shareUrl = `https://pinterest.com/pin/create/button/?url=${pageUrl}`;
          break;

        case "copy":
          navigator.clipboard.writeText(pageUrl)
          .then(() => alert("Link copied!"))
          .catch(() => alert("Copy failed"));
          return;
      }

      window.open(shareUrl, "_blank");
    });

  });

});
