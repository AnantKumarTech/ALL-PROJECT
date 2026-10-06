const API = "https://dummyjson.com/products?limit=0";
const CATEGORY_API = "https://dummyjson.com/products/categories";
const productsContainer = document.querySelector("#products-container");
const categoryFilters = document.querySelector("#category-filters");
let allCategories = [];
let productWislist=[];

function getItem(key) {
  return JSON.parse(localStorage.getItem(key))||[];
}
function setItem(key,data) {
  localStorage.setItem(key,JSON.stringify(data));
}

function formatCategory(category) {
  return category.replace("-", " ");
}
function dollerToPrice(price) {
  return Math.floor(price * 96.24);
}

async function fetchProduct(name) {
    productsContainer.innerHTML = "Loading....";
    const response = await fetch(name)
    const data = await response.json();

  

    renderData(data.products);

    
}



function renderData(value) {
  productsContainer.innerHTML = "";

  value.forEach((p) => {
    let article = document.createElement("article");

    article.className =
      "bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition";

    article.innerHTML = `
            <div class="h-48 w-full flex items-center justify-center p-3 mb-4 bg-white">
                <img 
                    src="${p.thumbnail}"
                    alt="${p.title}"
                    class="max-h-full max-w-full object-contain"
                >
            </div>

            <div class="flex-grow flex flex-col">

                <span class="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
                    ${formatCategory(p.category)}
                </span>

                <h2 
                    class="font-semibold text-slate-900 text-sm mb-2 line-clamp-2"
                    title="${p.title}"
                >
                    ${p.title}
                </h2>

                <div class="mt-auto pt-2">
                    <span class="text-lg font-bold text-slate-900">
                        ₹${dollerToPrice(p.price)}
                    </span>
                </div>

                <a 
                    href="product-details.html?id=${p.id}"
                    class="mt-4 block w-full text-center bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition"
                >
                    View Details
                </a>

            </div>
        `;

    productsContainer.append(article);
  });


}


async function fetchcatories() {
  
    const response = await fetch(CATEGORY_API);
    const data = await response.json();

    console.log(data);
    allCategories = [{ name: "All", slug: "all", url: API }, ...data];
    rendercatorgies();
  
}
if(productsContainer){
fetchProduct(API);
fetchcatories();}

function rendercatorgies(value="all"){
 categoryFilters.innerHTML = "";
   allCategories.forEach(({ name, slug, url }) => {
     let button = document.createElement("button");
    if(value===slug){
 button.className =
   "px-4 py-1.5 rounded-md text-sm font-medium bg-teal-700 text-white transition";
    }
    else{
      button.className =
        "px-4 py-1.5 rounded-md text-sm font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition"; 
    }
    
     button.type = "button";
     button.dataset.url = url;
     button.dataset.id = slug;
     button.textContent = name;
     categoryFilters.append(button);
   });
}

if (categoryFilters){
  categoryFilters.addEventListener("click", (e) => {
    e.stopPropagation();
    const element = e.target;
    if (element.tagName === "BUTTON") {
      const category = element.dataset.id;
      const url = element.dataset.url;
      console.log(url);
      console.log(category);
      fetchProduct(url);
      rendercatorgies(category);
    }
  });
}




const searchInput=document.querySelector("#search-input");
if (searchInput){
  searchInput.addEventListener("input", (e) => {
    e.stopPropagation();
    const input = searchInput.value;
    const url = `https://dummyjson.com/products/search?q=${input}`;
    fetchProduct(url);
  });}


async function loadProductPage() {
  const productDetailContainer = document.querySelector(
    "#product-detail-container",
  );
  if (!productDetailContainer) {
    return;
  }
  const param = new URLSearchParams(location.search);
  const id = param.get("id");
  console.log(id);

  const url = `https://dummyjson.com/products/${id}`;

  productDetailContainer.innerHTML = "Loading...";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
    if (data.message) {
      productDetailContainer.innerHTML = "Failed to load product details.";
      return;
    }
  // images  
  const { thumbnail, category, price, rating, reviews, title, description } =data;  

  productDetailContainer.innerHTML = `
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        <div class="bg-white border border-slate-200 rounded-lg p-8 flex items-center justify-center min-h-[350px] md:min-h-[440px]">
          <img 
            src=${data.thumbnail} 
            alt="Essence Mascara Lash Princess" 
            class="max-h-96 max-w-full object-contain"
          >
        </div>

        <div class="flex flex-col">
          <div>
            <span class="inline-block text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
              ${data.category}
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
            ${data.title}
          </h1>

          <div class="flex items-center gap-1 mb-4">
            <div class="flex items-center" aria-label="2.6 out of 5 stars">
              <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-slate-300 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <svg class="w-5 h-5 text-slate-300 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="ml-2 text-sm text-slate-500 font-medium">
              ${data.rating}  (${data.reviews.length} reviews)
            </span>
          </div>

          <div class="mb-6">
            <span class="text-2xl sm:text-3xl font-bold text-slate-900">
              ${dollerToPrice(data.price)}
            </span>
          </div>

          <div class="border-t border-b border-slate-200 py-6 mb-6">
            <p class="text-slate-600 text-base leading-relaxed">
              ${data.description}
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            <div class="flex items-center border border-slate-300 rounded-md bg-white w-fit">
              <button 
                type="button" 
                id="qty-minus" 
                class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l-md transition"
                aria-label="Decrease quantity"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                </svg>
              </button>

              <span id="qty-value" class="w-12 text-center text-sm font-semibold text-slate-900 select-none">
                1
              </span>

              <button 
                type="button" 
                id="qty-plus" 
                class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r-md transition"
                aria-label="Increase quantity"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>

            <button 
              type="button" 
              id="add-to-cart-btn" 
              class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium py-2.5 px-6 rounded-md shadow-sm transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span>Add to Cart</span>
            </button>

            <button 
              type="button" 
              id="add-to-wishlist-btn" 
              class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-teal-700 text-teal-700 hover:bg-teal-50 font-medium py-2.5 px-6 rounded-md shadow-sm transition"
            >
              <svg id="wishlist-btn-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span id="wishlist-btn-text">Add to Wishlist</span>
            </button>
          </div>

        </div>
      </div>
    
  `;

const wishlist = document.querySelector("#add-to-wishlist-btn");
wishlist.addEventListener("click",(e)=>{
  e.preventDefault();
  const wishlistItem = getItem("wishlist");
  if(wishlistItem.length){
    const exist=wishlistItem.some((value)=>{
      return (value.id===data.id)

      
    })
    if(!exist){
      setItem("wishlist",[data,...wishlistItem]);
    }
  }


else{
  setItem("wishlist",[data]);
}
   console.log(wishlistItem);


})
}







loadProductPage();