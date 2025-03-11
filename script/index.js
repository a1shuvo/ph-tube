// Load Categories with fetch and send to displayCategories
function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
}

// Display Categories using for...of loop and append them
function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (const cat of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.appendChild(categoryDiv);
    }
    
}

loadCategories();