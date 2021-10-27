// For IIFE

const pokemonRepository = (function() {

    const pokemonList = [];

    const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

     // Adds a new pokemon at the end of the pokemonList
     // with the correct type of data

     function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }

    // Creates li and button for the pokemonList
    function addListItem(pokemon){

      //Selecting unordered list from index.html
      const list = document.querySelector('.pokemon-list');
  
      //Creating list items to go inside ul
      const listItem = document.createElement('li');
      listItem.classList.add('group-list-item', 'col-lg-4', 'col-md-6');
  
      //Creating buttons for list items 
      const button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-warning','btn-block', 'pokemon-button', 'border', 'border-secondary');
  
      //Linking buttons to modal
      button.setAttribute('data-target', '#pokemonModalContainer');
      button.setAttribute('data-toggle', 'modal');
  
      //EVENT: open modal on click
      button.addEventListener('click', function(){
        showDetails(pokemon);
      });
  
  
      //append button to listItem
      listItem.appendChild(button);
      //append listItem to list
      list.appendChild(listItem);
  
    }

    //loads the API and extracts needed details
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            detailsUrl: item.url,
            name: item.name
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    // Fetch details about pokemons
    function loadDetails(pokemon) {
      const url = pokemon.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
        pokemon.weight = details.weight;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showDetails(pokemon){
      loadDetails(pokemon).then(function() {
        showModal(pokemon);
      });
    }

    // Modal code
    const modalContainer = document.querySelector('#pokemonModalContainer');

    function showModal(pokemon) {
      let modalTitle = document.querySelector('.modal-title');
      let modalBody = document.querySelector('.modal-body');
  
      modalTitle.innerText = '';
      modalBody.innerText = '';
  
      //create element for name in modal
      let nameElement = document.createElement('h1');
      nameElement.innerText = pokemon.name;
      nameElement.classList.add('name-element');
  
      //create img in modal content
      const imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;
      imageElement.classList.add('modal-img');
  
      //create element for height in modal content
      let heightElement = document.createElement('p');
      heightElement.innerText = 'Height: ' + pokemon.height;

      //create element for weight

      const weightElement = document.createElement("p");
      weightElement.innerText = "Weight: " + pokemon.weight;
  
      //create element for pokemon in modal content
      const pokemonTypes = [];
      
        Object.keys(pokemon.types).forEach(key => {
          pokemonTypes.push(' ' + pokemon.types[key].type.name);
        });
  
      const typesElement = document.createElement('p');
      typesElement.innerText = 'Type: ' + pokemonTypes;
      typesElement.classList.add('types-element');
  
  
      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(typesElement); 

		  modalContainer.classList.add('is-visible');
	}


	// Function to hide modal 
	function hideModal () {
		modalContainer.classList.remove('is-visible');
	}

	// Function to hide modal when Escape key is pressed
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
			hideModal();
		}
	});

	//Function to hide modal when clicking outside of modal
	modalContainer.addEventListener('click', (e) => {
		const target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});

	// Function to search for pokemon using search bar

	const pokemonSearchBar = document.querySelector('#filter');

	pokemonSearchBar.addEventListener('input', function() {
		const pokeListItem = document.querySelectorAll('li');
		const filter = pokemonSearchBar.value.toUpperCase();

		pokeListItem.forEach(function(pokemon){
			if (pokemon.innerText.toUpperCase().indexOf(filter) === 0) {
				pokemon.style.display = 'block';
			} else {
				pokemon.style.display = 'none';
			}
		});
	});

  //Scroll back to top button

   const scrollUpButton = document.getElementById('btn-back-to-top');

   scrollUpButton.addEventListener('click', backToTop);

   function backToTop() {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
}
  
    
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