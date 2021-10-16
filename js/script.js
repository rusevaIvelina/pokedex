// For IIFE

let pokemonRepository = (function() {

let pokemonList = [
  {
   name:'Corsola',
   height: 0.6,
   type: ['water', 'rock']
  },
    {
   name:'Raichu',
   height: 0.8,
   type: ['electric']
   },
    {
    name:'Seel',
    height: 1.1,
    type: ['water']
   },
    {
    name:'Mamoswine',
     height: 2.5,
      type: ['ice', 'ground']
   },
     {
    name:'Vileplume',
    height: 1.2,
    type: ['grass', 'poison']
   },
     {
    name:'Ponyta',
    height: 1.0,
    type: ['fire']
    }
];
 // Adds a new pokemon at the end of the pokemonList with the correct type of data
function add(pokemon) {
  if (typeof pokemon === 'object') {
  pokemonList.push(pokemon);
  } else {
    document.write('Not a pokemon')
  };
}

function getAll() {
  return pokemonList;
}

return {
  add:add,
  getAll: getAll
};
})();

console.log(pokemonRepository.getAll());