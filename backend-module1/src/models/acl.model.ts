import {Entity, model, property} from '@loopback/repository';

@model({name: 'acl'})
export class Acl extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  accesstype: string; // e.g. READ, WRITE, ALL

  @property({
    type: 'string',
    required: true,
  })
  principaltype: string; // e.g. ROLE, USER

  @property({
    type: 'string',
    required: true,
  })
  principalid: string; // e.g. admin, manager, user

  @property({
    type: 'string',
    required: true,
  })
  permission: string; // ALLOW or DENY

  @property({
    type: 'string',
    required: true,
  })
  property: string; // e.g. create, find, update, *

  @property({
    type: 'string',
    required: true,
  })
  resource: string; // e.g. module1, module2

  constructor(data?: Partial<Acl>) {
    super(data);
  }
}

export interface AclRelations {
  // describe navigational properties here if needed
}

export type AclWithRelations = Acl & AclRelations;
