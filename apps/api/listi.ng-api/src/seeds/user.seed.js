const { v4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = await bcrypt.hash('demo123', 10); // Hash the demo account password
    await queryInterface.bulkInsert('users', [
      {
        id: v4(),
        name: 'Demo User',
        email: 'demo@listi.ng',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', { email: 'demo@listi.ng' });
  },
};
