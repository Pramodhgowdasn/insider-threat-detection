require('dotenv').config();
const db = require('../src/database/db');

const eventRepository = require('../backend/src/repositories/event.repository');
const alertGenerationService = require('../backend/src/services/alert-generation.service');

const seedEvents = async () => {
  const events = [
    {
      event_type: 'LOGIN',
      source: 'auth-service',
      metadata: { user: 'admin' },
    },
    {
      event_type: 'LOGIN',
      source: 'auth-service',
      metadata: { user: 'bob' },
    },
    {
      event_type: 'FILE_DELETE',
      source: 'file-service',
      metadata: { user: 'alice', file: 'salary.xlsx' },
    },
    {
      event_type: 'FILE_ACCESS',
      source: 'file-service',
      metadata: { user: 'intern', file: 'confidential.pdf' },
    },
    {
      event_type: 'LOGIN',
      source: 'vpn-service',
      metadata: { user: 'admin', location: 'foreign-ip' },
    },
  ];

  for (const e of events) {
    const event = await eventRepository.create(e);
    await alertGenerationService.processEventForAlert(event);
    console.log('Seeded:', e.event_type, e.metadata);
  }

  console.log('✅ Seeding completed');
  process.exit(0);
};

seedEvents().catch((err) => {
  console.error(err);
  process.exit(1);
});
