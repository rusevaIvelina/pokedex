// For IIFE

let pokemonRepository = (function() {

    let pokemonList = [];
     
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

     // Adds a new pokemon at the end of the pokemonList with the correct type of data

     function add(pokemon) {
      pokemonList.push(pokemon);
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

    // call showDetails function upon button click
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        showModal (pokemon.name, pokemon.imageUrl, pokemon.height, pokemon.weight)
        console.log(pokemon);
        });
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

    // Fetch details about pokemons
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

    // Modal code
    let modalContainer = document.querySelector('#modal-container');
    function showModal(name, img,height, weight) {

      modalContainer.innerHTML = '.';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = name;

      let pokemonImage = document.createElement('img');
      pokemonImage.scr = img;

      let pokemonWeight = document.createElement('p');
      pokemonWeight.innerText = 'Weight:' + weight;

      let pokemonHeight = document.createElement('p');
      pokemonHeight.innerText = 'Height:' + height;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(pokemonImage);
      modal.appendChild(pokemonWeight);
      modal.appendChild(pokemonHeight);
      modalContainer.appendChild(modal);
      
      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      })
    };

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
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
