const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const [user] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'demo@listi.ng';`
    );

    const demoUserId = user[0]?.id;
    console.log('Demo User ID:', demoUserId); // Log the demo user ID for debugging
    if (demoUserId) {
      const aa = await queryInterface.bulkInsert('todos', [
        {
          id: uuidv4(),
          title: 'Learn Angular',
          description: 'Understand Angular basics and Material components.',
          completed: false,
          userId: demoUserId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: 'Build a Todo App',
          description: 'Create a full-stack Todo app with Angular and Node.js.',
          completed: false,
          userId: demoUserId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log(aa)
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('todos', null, {});
  },
};
