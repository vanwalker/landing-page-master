

const url = "https://pokeapi.co/api/v2/pokemon";
fetch(url, {
  method: "GET",
  headers: { "Content-Type": "application/json" }
})
  .then((response) => response.json())
  .then((data) => {
  	const topThree = data.results.slice(0,3);
    const monTableauPokemon = topThree.map(async (pokemon) => {
      const response = await fetch(url + `/${pokemon.name}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      return await response.json();
    });
    console.log(monTableauPokemon);

    Promise.all(monTableauPokemon).then((data) => {
      data.forEach((poke) => {
        let card = `<div class="card">
          <h1>${poke.name}</h1>
          <img src=${poke.sprites.front_default} />
          </div>`;
        document.getElementById("app").insertAdjacentHTML("beforeend", card);
      });
    });
  }).catch((error) => {
    console.error(error);
  });
  

