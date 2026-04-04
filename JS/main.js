
const currentPage = window.location.pathname.split("/").pop();

/* 🔥 Load Header */
fetch("../components/header.html")
  .then(res => res.text())
  .then(data => document.getElementById("header").innerHTML = data);

/* 🔥 Load Footer */
fetch("../components/footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);

/* 🔥 Load Sidebar */
fetch("../components/sidebar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("sidebar").innerHTML = data;

    // Sidebar load hone ke baad JSON run karo
    loadPostData();
  });

function loadPostData(){

  fetch("../data/stories.json")
    .then(res => res.json())
    .then(data => {

      const post = data.find(item => item.link.includes(currentPage));

      if(!post){
        document.body.innerHTML = "<h2>Post not found</h2>";
        return;
      }

      // ✅ Date format fix
     // const formattedDate = new Date(post.date).toDateString();
      const date = new Date(post.date).toDateString(); document.getElementById("post-date").innerText = date;

      // ✅ Main Post Data
      document.getElementById("post-title").innerText = post.title;
      document.getElementById("post-author").innerText = "By " + post.author;
      document.getElementById("post-date").innerText = formattedDate;
      document.getElementById("post-image").src = post.image;

      document.title = post.title;

      // ✅ Tags UI (optional but recommended)
      if(document.getElementById("post-tags")){
        const tagHTML = post.tags.map(tag =>
          `<span class="badge bg-primary me-1">${tag}</span>`
        ).join("");

        document.getElementById("post-tags").innerHTML = tagHTML;
      }

      // 🔥 RELATED POSTS (TAG MATCHING)
      let related = data.filter(item => {

        if(item.link.includes(currentPage)) return false;

        return item.tags.some(tag => post.tags.includes(tag));
      });

      // 🔥 Sort latest first
      related.sort((a, b) => new Date(b.date) - new Date(a.date));

      // 🔥 Fallback (agar related na mile)
      if(related.length === 0){
        related = data.filter(item => !item.link.includes(currentPage));
      }

      const topRelated = related.slice(0, 5);

      // 🔥 Sidebar UI render
      let html = "";

      topRelated.forEach(item => {
        html += `
          <a href="../${item.link}" class="text-decoration-none">
            <div class="d-flex mb-3 align-items-center">
              <img src="${item.image}" width="80" height="60" 
                   class="rounded me-2" style="object-fit:cover;">
              <div>
                <h6 class="mb-1">${item.title}</h6>
                <small class="text-muted">${item.date}</small>
              </div>
            </div>
          </a>
        `;
      });

      document.getElementById("related-posts").innerHTML = html;

    });
}

