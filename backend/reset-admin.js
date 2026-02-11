
const db = require('./src/database/db');
const bcrypt = require('bcrypt');

async function checkAdmin() {
  try {
    console.log('Checking for admin user...');
    const user = await db('users').where({ username: 'admin' }).first();
    
    if (!user) {
      console.log('User "admin" not found.');
      
      // Create admin user
      const passwordHash = await bcrypt.hash('admin123', 10);
      await db('users').insert({
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
        password_hash: passwordHash,
        created_at: new Date(),
        updated_at: new Date()
      });
      console.log('Created user "admin" with password "admin123"');
    } else {
      console.log('User "admin" found.');
      // Reset password to be sure
      const passwordHash = await bcrypt.hash('admin123', 10);
      await db('users').where({ id: user.id }).update({
        password_hash: passwordHash
      });
      console.log('Reset password for "admin" to "admin123"');
    }
    
    // Verify
    const updatedUser = await db('users').where({ username: 'admin' }).first();
    const match = await bcrypt.compare('admin123', updatedUser.password_hash);
    console.log('Verification check for "admin123":', match ? 'SUCCESS' : 'FAILED');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    process.exit();
  }
}

checkAdmin();
