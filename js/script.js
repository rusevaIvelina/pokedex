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

for ( let i = 0; i < pokemonList.length; i++) {
  document.write('<p id="pokedex-style">' + pokemonList[i].name + (' \(Height: ') + pokemonList[i].height + '\)' + '</p> <br>');
  if (pokemonList[i].height > 2) {
    document.write('- Wow! That is big!');
  }
}  


