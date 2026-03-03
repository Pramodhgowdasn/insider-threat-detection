exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  // Inserts seed entries with CERT r4.2 context
  await knex('users').insert([
    {
      id: 1,
      username: 'admin',
      email: 'admin@sentinel-ai.io',
      role: 'admin',
      functional_unit: 'IT',
      password_hash: '$2b$10$eg0AI5dFLzEYizAHuDpmk.rfinGwG29BSpNKXZoHWaG5BU4J7JO0G', // admin123
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      username: 'analyst_bob',
      email: 'bob@sentinel-ai.io',
      role: 'analyst',
      functional_unit: 'Security',
      password_hash: '$2b$10$eg0AI5dFLzEYizAHuDpmk.rfinGwG29BSpNKXZoHWaG5BU4J7JO0G', // admin123
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      username: 'dev_alice',
      email: 'alice@sentinel-ai.io',
      role: 'engineer',
      functional_unit: 'R&D',
      password_hash: '$2b$10$eg0AI5dFLzEYizAHuDpmk.rfinGwG29BSpNKXZoHWaG5BU4J7JO0G',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      username: 'finance_john',
      email: 'john@sentinel-ai.io',
      role: 'manager',
      functional_unit: 'Finance',
      password_hash: '$2b$10$eg0AI5dFLzEYizAHuDpmk.rfinGwG29BSpNKXZoHWaG5BU4J7JO0G',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      username: 'hr_sarah',
      email: 'sarah@sentinel-ai.io',
      role: 'employee',
      functional_unit: 'HR',
      password_hash: '$2b$10$eg0AI5dFLzEYizAHuDpmk.rfinGwG29BSpNKXZoHWaG5BU4J7JO0G',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};
