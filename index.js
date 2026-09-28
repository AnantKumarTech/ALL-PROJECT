

let movieform=document.querySelector("form");
let Movieinput = document.querySelector("#serach-movie");
let inserting = document.querySelector("#inserting");





movieform.addEventListener("submit", (e) => {
  e.preventDefault();
  let query = Movieinput.value.trim();
  if (!query) {
    return;
  }
  console.log(query);
  searchMovie(query)
});


async function searchMovie(query){
    inserting.innerHTML="Searching Movie...";
    let respone=await fetch(`https://www.omdbapi.com/?apikey=b6496e03&s=${query}`);
    let data= await respone.json();
    console.log(data);
    
    if(data.Response==="True"){
       getingMovie(data.Search);
    }
    else{
        console.log(data.Error);
        inserting.innerHTML=`<p>${data.Error}</p>`;
    }
}

function getingMovie(movies){
    inserting.innerHTML=``;
  movies.forEach((value) => {
    let div=document.createElement("div");
    div.dataset.id = `${value.imdbID}`;
    div.setAttribute("class","movie-set")
    div.innerHTML = `    <div
        class="group bg-[#0b0c14] rounded-2xl p-3
               border border-purple-500/70
               hover:border-purple-400
               hover:-translate-y-2
               transition-all duration-300
               shadow-lg hover:shadow-purple-500/20"
      >

        <div class="relative overflow-hidden rounded-xl">

          <img
            src="${value.Poster}"
            alt="${value.Title}"
            class="w-full h-[380px] object-cover
                   transition-transform duration-500
                   group-hover:scale-105"
          >

          <span
            class="absolute top-4 right-4
                   bg-purple-500 text-white
                   px-4 py-2 rounded-lg
                   font-semibold"
          >
            🎬 ${value.Type}
          </span>

        </div>

        <div class="px-2 pt-4 pb-3">

          <h2
            class="text-md font-bold text-white
                   group-hover:text-purple-400
                   transition"
          >
            ${value.Title}
          </h2>

          <p class="text-gray-400 mt-2">
            📅 ${value.Year}
          </p>

          <p class="text-gray-400 mt-2">
            🎬 ${value.Type}
          </p>

          <button
            class="mt-5 w-full py-2.5
                   rounded-lg
                   border border-purple-500
                   text-purple-400
                   hover:bg-purple-500
                   hover:text-white
                   transition duration-300"
          >
            View Details
          </button>

        </div>

      </div>
    `;
    inserting.append(div);
  });
}




inserting.addEventListener("click", (e) => {
  // Stop the click event from bubbling to parent elements
  e.stopPropagation();

  // Find the closest parent element having class ".movie-set"
  let res = e.target.closest(".movie-set");
  let ans = res.dataset.id;
  // Get the value of data-id from that element
  console.log(ans);
  location.href=`movie-detail.html?id=${ans}`;
});