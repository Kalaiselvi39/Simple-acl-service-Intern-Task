import {UserRepository} from './repositories';
import {PostgresDataSource} from './datasources';
async function seed() {
  const ds = new PostgresDataSource();
  const repo = new UserRepository(ds);
  await ds.automigrate('User');
  await repo.createAll([
    {username: 'person1', password: 'pass1', role: 'admin'},
    {username: 'person2', password: 'pass2', role: 'manager'},
    {username: 'person3', password: 'pass3', role: 'user'},
  ]);
  console.log('Users seeded');
  await ds.disconnect();
}
seed().catch(err => console.error(err));
