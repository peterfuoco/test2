'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert("Pokemons",
  [
      {
        name: "Bulbasaur",
        img: "http://img.pokemondb.net/artwork/bulbasaur.jpg",
        playerId: 1,
      },
      {
        name: "Ivysaur",
        img: "http://img.pokemondb.net/artwork/ivysaur.jpg",
        playerId: 2,
      },
      {
        name: "Venusaur",
        img: "http://img.pokemondb.net/artwork/venusaur.jpg",
        playerId: 3,
      },
      {
        name: "Charmander",
        img: "http://img.pokemondb.net/artwork/charmander.jpg",
        playerId: 4,
      },
      {
        name: "Charizard",
        img: "http://img.pokemondb.net/artwork/charizard.jpg",
        playerId: 5,
      },
      {
        name: "Squirtle",
        img: "http://img.pokemondb.net/artwork/squirtle.jpg",
        playerId: 6,
      },
      {
        name: "Wartortle",
        img: "http://img.pokemondb.net/artwork/wartortle.jpg",
        playerId: 7,
      }
    ],
    {}
  );
},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
