'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Players', 
     [
      {
          name:'Tony Stark',
          username: 'ironman',
          password: 'prettyawesome',
          teamID: 1,
      },
      {
          name:'Clark Kent',
          username: 'superman',
          password: `canfly`,
          teamID: 2,
      },
      {
          name:'Bruce Wayne',
          username: 'batman',
          password: 'hasgadgets',
          teamID: 3,
      },
      {
          name: 'Chris Heminsworth',
          username: 'Thor',
          password: 'hammer',
          teamID: 4,
      },
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
  }
};
