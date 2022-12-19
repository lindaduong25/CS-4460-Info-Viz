// DOM #main div element
var main = document.getElementById('main');

// **** Your JavaScript code goes here ****

pokemonList = [{
    "name": "Bulbasaur",
    "type": "Grass",
    "final_evolution": "Venusaur",
    "hp": 80,
    "attack_power": 82,
},
{
    "name": "Charmander",
    "type": "Fire",
    "final_evolution": "Charizard",
    "hp": 78,
    "attack_power": 84,
},
{
    "name": "Squirtle",
    "type": "Water",
    "final_evolution": "Blastoise",
    "hp": 79,
    "attack_power": 83,
}]

function halfHP(pokemon) {
    pokemon.hp = pokemon.hp / 2;
    return pokemon.hp;
}

pokemonList.forEach(poke => {
    let favPoke = "Bulbasaur";
    if (poke.name == favPoke) {
        return;
    } else {
        halfHP(poke);
    }
})

function debugPoke() {
    pokemonList.forEach(poke => {
        console.log(poke.name);
        console.log(poke.hp);
    });
}

debugPoke();

// Create a new DOM element
var header = document.createElement("h3");
// Append the newly created <h3> element to #main
main.appendChild(header);
// Set the textContent to:
header.textContent = "Pokemon Starters";

function displayPokeInformation() {
    pokemonList.forEach(poke => {
        var div = document.createElement("div");
        // Create a new <h5> element
        var name = document.createElement("h5");
        var type = document.createElement("p");
        var final_evolution = document.createElement("p");
        var hp = document.createElement("p");
        var attack_power = document.createElement("p");

        // Append the newly created <div> element to #main
        main.appendChild(div);
        div.appendChild(name);
        div.appendChild(type);
        div.appendChild(final_evolution);
        div.appendChild(hp);
        div.appendChild(attack_power);


        // Set the textContent to the pokemon's name
        name.textContent = poke.name;
        // Set the textContent to the pokemon's type.
        type.textContent = "Type: " + poke.type;
        final_evolution.textContent = "Final Evolution: " + poke.final_evolution;
        hp.textContent = "Hp: " + poke.hp;
        attack_power.textContent = "Attack Power: " + poke.attack_power;

        // adding css styling with d3 and without d3
        if (poke.type == "Grass") {
            d3.select("h5").attr('class', 'grass');
        } else if (poke.type == "Fire") {
            name.classList.add("fire");
        } else {
            name.classList.add("water");
        }
        d3.selectAll("div").attr('class', 'div');
    });
}

displayPokeInformation();