import {Entity, model, property} from '@loopback/repository';

@model()
export class Roles extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  role?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
