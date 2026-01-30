require('dotenv').config();
const userRepository = require('../backend/src/repositories/user.repository');

const seedUsers = async () => {
  const users = [
    { username: 'admin', role: 'admin' },
    { username: 'alice', role: 'employee' },
    { username: 'bob', role: 'employee' },
    { username: 'intern', role: 'intern' },
    { username: 'contractor', role: 'contractor' },
  ];

  for (const user of users) {
    const exists = await userRepository.findByUsername(user.username);
    if (!exists) {
      await userRepository.create(user);
      console.log('Seeded user:', user.username);
    }
  }

  console.log('✅ User seeding completed');
  process.exit(0);
};

seedUsers().catch((err) => {
  console.error(err);
  process.exit(1);
});
