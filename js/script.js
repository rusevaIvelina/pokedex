// For IIFE

let pokemonRepository = (function() {

    let pokemonList = [
       { name:'Corsola', height: 0.6, type: ['water', 'rock'] },
       { name:'Raichu', height: 0.8, type: ['electric'] },
       { name:'Seel', height: 1.1, type: ['water'] },
       { name:'Mamoswine', height: 2.5, type: ['ice', 'ground'] },
       { name:'Vileplume', height: 1.2, type: ['grass', 'poison'] },
       { name:'Ponyta', height: 1.0, type: ['fire'] }
    
    ];
    
     // Adds a new pokemon at the end of the pokemonList with the correct type of data
    function add(pokemon) {
      if (pokemon.name && pokemon.height && pokemon.type) {
      pokemonList.push(pokemon);
      } else {
        document.write('not a pokemon')
      };
    }
    
    function getAll() {
      return pokemonList;
    }

    // Creates the pokemon list on the webpage

    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listPokemon = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);

    // Adds an eventListener 

      button.addEventListener('click', function() {
          showDetails(pokemon)
      })
    }

    // call showDetails function upon button click

    function showDetails(pokemon) {
        console.log(pokemon.name)
    }
    
    return {
      add:add,
      getAll: getAll,
      addListItem: addListItem
    };
    })();
    
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon)
    });
