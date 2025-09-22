import {get} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';

export class Module1Controller {
  constructor() {}

  // READ operation
  @authenticate('jwt')
  @authorize({
    resource: 'module1',
    scopes: ['find'],
  })
  @get('/module1')
  async getModule1(@inject(SecurityBindings.USER) currentUser: UserProfile) {
    return {
      message: 'Welcome to Module 1 (READ)',
      user: {id: currentUser.id, role: currentUser.role},
    };
  }

  // CREATE operation
  @authenticate('jwt')
  @authorize({
    resource: 'module1',
    scopes: ['create'],
  })
  @get('/module1/create')
  async createModule1(@inject(SecurityBindings.USER) currentUser: UserProfile) {
    return {
      message: 'You can create in Module 1',
      user: {id: currentUser.id, role: currentUser.role},
    };
  }
}
