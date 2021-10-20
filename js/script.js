// For IIFE

let pokemonRepository = (function() {

    let pokemonList = [];
     
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

    // Creates tli and button for the pokemonList

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
   
    //loads the API and extracts needed details
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    // call showDetails function upon button click
    function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
      });
    } 

    function showModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.add('is-visible');
    }
    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal();
    });
    
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
    })();
    
    pokemonRepository.loadList().then(function() {
     pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
     });
    });
