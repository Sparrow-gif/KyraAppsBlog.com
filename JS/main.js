// ===============================
// 🔥 CURRENT PAGE
// ===============================
const currentPage = window.location.pathname.split("/").pop();


// ===============================
// 🔥 LOAD COMPONENTS
// ===============================

// Header
fetch("../components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

// Footer
fetch("../components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });

// Social Share
fetch("../components/social-share.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("social-share").innerHTML = data;
  });

// Sidebar → then load post data
fetch("../components/sidebar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("sidebar").innerHTML = data;
    loadPostData();
  });


// ===============================
// 🔥 MAIN FUNCTION
// ===============================
function loadPostData(){

  fetch("../data/stories.json")
    .then(res => res.json())
    .then(data => {

      const post = data.find(item => item.link.includes(currentPage));

      // ❌ Post not found
      if(!post){
        document.body.innerHTML = `
          <h2 class="text-center mt-5">Post not found</h2>
        `;
        return;
      }

      // ===============================
      // ✅ FORMAT DATE
      // ===============================
      const formattedDate = new Date(post.date).toDateString();


      // ===============================
      // ✅ MAIN POST DATA
      // ===============================
      document.getElementById("post-title").innerText = post.title;
      document.getElementById("post-author").innerText = "By " + post.author;
      document.getElementById("post-date").innerText = formattedDate;

      const img = document.getElementById("post-image");
      img.src = post.image;
      img.alt = post.title;


      // ===============================
      // 🔥 DYNAMIC SEO META
      // ===============================
      document.title = post.title;

      let metaDesc = document.querySelector("meta[name='description']");
      if(!metaDesc){
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = post.description || "";


      // ===============================
      // 🔥 TAGS UI
      // ===============================
      if(post.tags && document.getElementById("post-tags")){
        const tagHTML = post.tags.map(tag =>
          `<span class="badge bg-primary me-1">${tag}</span>`
        ).join("");

        document.getElementById("post-tags").innerHTML = tagHTML;
      }


      // ===============================
      // 🔥 SOCIAL SHARE INIT
      // ===============================
      if(typeof initSocialShare === "function"){
        initSocialShare(post);
      }


      // ===============================
      // 🔥 RELATED POSTS
      // ===============================
      let related = data.filter(item => {
        if(item.link.includes(currentPage)) return false;
        return item.tags?.some(tag => post.tags?.includes(tag));
      });

      // Sort latest
      related.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Fallback
      if(related.length === 0){
        related = data.filter(item => !item.link.includes(currentPage));
      }

      const topRelated = related.slice(0, 5);

      let html = "";

      topRelated.forEach(item => {

        const date = new Date(item.date).toDateString();

        html += `
          <a href="../${item.link}" class="text-decoration-none text-dark">
            <div class="d-flex mb-3 align-items-center">
              <img src="${item.image}" width="80" height="60"
                   alt="${item.title}"
                   loading="lazy"
                   class="rounded me-2"
                   style="object-fit:cover;">
              <div>
                <h6 class="mb-1">${item.title}</h6>
                <small class="text-muted">${date}</small>
              </div>
            </div>
          </a>
        `;
      });

      document.getElementById("related-posts").innerHTML = html;

    })
    .catch(err => {
      console.error("JSON Load Error:", err);
      document.body.innerHTML = `
        <h2 class="text-center mt-5">Something went wrong</h2>
      `;
    });
}

