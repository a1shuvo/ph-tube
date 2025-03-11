// Showing Loaders
const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
};

// Hiding Loaders
const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
};

// Remove Active Class Category Button
function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (const btn of activeButtons) {
        btn.classList.remove("active");
    };
};

// Load Categories with fetch and send to displayCategories
function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
};

// Load videos and Send to displayVideos
function loadVideos(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos);
        });
};

// Load Categoy Wise Videos and display Videos
const loadCategoryVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url).then(res => res.json()).then(data => {
        removeActiveClass();
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active");
        displayVideos(data.category);
    });
};

// Load Video Details with Video ID and send to Video Details
const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url).then(res => res.json()).then(data => {
        displayVideoDetails(data.video);
    });
};


// Display Video Details
const displayVideoDetails = (video) => {
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
    <figure>
        <img
        src="${video.thumbnail}"
        alt="Movie" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${video.title}</h2>
        <div class="flex gap-3 items-center py-2">
            <img class="w-8 h-8 rounded-full ring-2 object-cover" src="${video.authors[0].profile_picture}" />
            <span class="font-bold">${video.authors[0].profile_name}</span>
        </div>
        <p>${video.description}</p>
    </div>
    </div>
    `;
};

// Dynamically Display Catrgory Buttons
function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (const cat of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    }
};

// Dynamically Display Videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
    // When Category Wise Videos empty
    if (videos.length === 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full py-20">
            <img class="w-[120px] mx-auto" src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold text-center">Oops!! Sorry, There is no content here.</h2>
        </div>
        `;
        hideLoader();
        return;
    }
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
                ${video.authors[0].verified
                ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="" />`
                : ``}
                </p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
              </div>
            </div>
            <button onclick=loadVideoDetails("${video.video_id}") class="btn btn-block">Show Details</button>
          </div>
        `;
        videoContainer.append(videoCard);
    });
    hideLoader();

};

// Add Search Functionality
document.getElementById("search-input").addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideos(input);
});

// Parse Views String to Number
function parseViews(views) {
    // Check for 'K' or 'k' (thousands)
    if (views.toUpperCase().endsWith('K')) {
        const numericPart = parseFloat(views.slice(0, -1));
        return numericPart * 1000;
    }

    // Check for 'M' or 'm' (millions)
    if (views.toUpperCase().endsWith('M')) {
        const numericPart = parseFloat(views.slice(0, -1));
        return numericPart * 1000000;
    }

    // If it's a simple number, parse it directly
    return parseInt(views, 10);
}

// Sort by View Functionality
document.getElementById("sort-by-view").addEventListener("click", () => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            const sortVideos = data.videos.sort((a, b) => {
                let x = parseViews(a.others.views);
                let y = parseViews(b.others.views);
                return x < y ? 1 : x > y ? -1 : 0;
            });
            // const sortVideos = data.videos.sort((a, b) => Math.sign(parseViews(b.others.views) - parseViews(a.others.views)));

            displayVideos(sortVideos);
        });
});

loadCategories();
loadVideos();