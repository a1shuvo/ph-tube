// Load Categories with fetch and send to displayCategories
function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
}

// Load videos and Send to displayVideos
function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos));
}

// Load Categoy Wise Videos and display Videos
const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url).then(res => res.json()).then(data => displayVideos(data.category));

}

// Dynamically Display Catrgory Buttons
function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (const cat of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    }
}

// Dynamically Display Videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-conatainer");
    videoContainer.innerHTML = "";
    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
         <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="${video.title}" />
              <span class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2"> 3hrs 56 min ago </span>
            </figure>
    
            <div class="flex gap-3 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                  <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                    <img src="${video.authors[0].profile_picture}"/>
                  </div>
                </div>
              </div>
    
              <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-1">
                    ${video.authors[0].profile_name}
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="" />
                </p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
              </div>
            </div>
          </div>
        `;
        videoContainer.append(videoCard);
    });

}

loadCategories();