import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources/postgres.datasource';
import {Acl, AclRelations} from '../models/acl.model';

export class AclRepository extends DefaultCrudRepository<
  Acl,
  typeof Acl.prototype.id,
  AclRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Acl, dataSource);
  }
}
