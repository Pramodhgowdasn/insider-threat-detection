exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      password_hash: '$2b$10$eg0AI5dFLzEYizAHuDpmk.rfinGwG29BSpNKXZoHWaG5BU4J7JO0G', // admin123
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      username: 'analyst',
      email: 'analyst@example.com',
      role: 'analyst',
      password_hash: '$2b$10$eg0AI5dFLzEYizAHuDpmk.rfinGwG29BSpNKXZoHWaG5BU4J7JO0G', // admin123
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};
