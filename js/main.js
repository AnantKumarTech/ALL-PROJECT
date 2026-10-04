const API = "https://dummyjson.com/products?limit=0";
const catories_APT = "https://dummyjson.com/products/categories";
const productsContainer = document.querySelector("#products-container");
const categoryFilters = document.querySelector("#category-filters");
let allCategories = [];
function formatCategory(category) {
  return category.replace("-", " ");
}

async function fetchProduct(name) {
  try {
    const response = await fetch(name)
    const data = await response.json();

  

    renderData(data.products);
  } catch (error) {
    // console.log(error);
  }
}

fetchProduct(API);

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
                    ${fetchProduct(p.category)}
                </span>

                <h2 
                    class="font-semibold text-slate-900 text-sm mb-2 line-clamp-2"
                    title="${p.title}"
                >
                    ${p.title}
                </h2>

                <div class="mt-auto pt-2">
                    <span class="text-lg font-bold text-slate-900">
                        ₹${Math.floor(p.price * 96.24)}
                    </span>
                </div>

                <a 
                    href="product.html"
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
  try {
    const response = await fetch(catories_APT);
    const data = await response.json();

    console.log(data);
    allCategories = [{ name: "All", slug: "all", url: API }, ...data];
    rendercatorgies(data);
  } catch (error) {
    console.log(error);
  }
}
fetchcatories();

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
categoryFilters.addEventListener("click",(e)=>{
      e.stopPropagation();
      const element =e.target;
      if (element.tagName === "BUTTON") {
        const category = element.dataset.id;
        const url = element.dataset.url;
        console.log(url);
        console.log(category);
        fetchProduct(url);
        rendercatorgies(category);
      }
   

})