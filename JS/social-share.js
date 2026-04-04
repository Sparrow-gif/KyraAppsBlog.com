function initSocialShare(post){

  const url = window.location.href;
  const title = encodeURIComponent(post.title);

  document.getElementById("share-facebook").href =
    `https://www.facebook.com/sharer/sharer.php?u=${url}`;

  document.getElementById("share-twitter").href =
    `https://twitter.com/intent/tweet?url=${url}&text=${title}`;

  document.getElementById("share-whatsapp").href =
    `https://api.whatsapp.com/send?text=${title}%20${url}`;

  document.getElementById("share-linkedin").href =
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

  // Copy Link
  document.getElementById("share-copy").onclick = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

}
