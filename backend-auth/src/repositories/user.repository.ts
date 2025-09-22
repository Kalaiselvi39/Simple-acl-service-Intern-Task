import {DefaultCrudRepository} from '@loopback/repository';
import {User} from '../models/user.model';
import {PostgresDataSource} from '../datasources/postgres.datasource';
import {inject} from '@loopback/core';
export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(User, dataSource);
  }
}
