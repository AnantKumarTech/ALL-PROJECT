const params = new URLSearchParams(location.search); 
// location.search gives you everything after ?:

const res = params.get("id");

console.log(res);
const movie=document.querySelector("#movie")
if (res) {
  searchMovie(res);
}

async function searchMovie(res) {
  let respone = await fetch(
    `https://www.omdbapi.com/?apikey=b6496e03&i=${res}`,
  );
  let data = await respone.json();
  console.log(data);

  if (data.Response === "True") {
    dispalyMovie(data);
  } else {
    console.log(data);
  }
}

function dispalyMovie(res){
movie.innerHTML = `
    <div class="max-w-5xl mx-auto 
                bg-gray-900/80 backdrop-blur-md
                text-white p-6 md:p-8 rounded-3xl
                shadow-2xl
                flex flex-col md:flex-row gap-8
                transition-all duration-500
                hover:shadow-purple-500/20">

        <!-- Poster -->
        <div class="shrink-0 flex justify-center">
            <img 
                src="${res.Poster}" 
                alt="${res.Title}"
                class="w-52 h-80 md:w-60 md:h-90
                       object-cover rounded-2xl
                       shadow-xl
                       transition-all duration-500
                       hover:scale-105
                       hover:-rotate-1
                       cursor-pointer"
            >
        </div>


        <!-- Movie Information -->
        <div class="flex-1 flex flex-col justify-center">

            <h1 class="text-3xl md:text-5xl font-extrabold
                       mb-6
                       transition-all duration-300
                       hover:text-purple-400">
                ${res.Title}
            </h1>


            <div class="flex flex-wrap gap-3 mb-5">

                <span class="px-4 py-2 bg-gray-800 rounded-full
                             text-sm hover:bg-purple-600
                             transition duration-300">
                    📅 ${res.Year}
                </span>

                <span class="px-4 py-2 bg-gray-800 rounded-full
                             text-sm hover:bg-purple-600
                             transition duration-300">
                    🎬 ${res.Genre}
                </span>

                <span class="px-4 py-2 bg-gray-800 rounded-full
                             text-sm hover:bg-purple-600
                             transition duration-300">
                    ⏱️ ${res.Runtime}
                </span>

            </div>


            <p class="mb-4 leading-7 text-gray-300">
                <strong class="text-white">Director:</strong>
                ${res.Director}
            </p>


            <p class="mb-4 leading-7 text-gray-300">
                <strong class="text-white">Actors:</strong>
                ${res.Actors}
            </p>


            <p class="mb-6 leading-7 text-gray-300">
                <strong class="text-white">Plot:</strong>
                ${res.Plot}
            </p>


            <!-- Rating -->
            <div class="flex items-center gap-3">

                <span class="text-gray-400">
                    IMDb Rating
                </span>

                <span class="px-4 py-2 rounded-xl
                             bg-yellow-500/20
                             text-yellow-400
                             font-bold text-lg
                             hover:bg-yellow-500
                             hover:text-black
                             transition-all duration-300
                             cursor-pointer">
                    ⭐ ${res.imdbRating}
                </span>

            </div>

        </div>

    </div>
`;

}