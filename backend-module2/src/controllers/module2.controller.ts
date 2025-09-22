import {get} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';

export class Module2Controller {
  constructor() {}

  @authenticate('jwt')
  @authorize({
    resource: 'module2',
    scopes: ['find'], // maps to property column in ACL
  })
  @get('/module2')
  async getModule2(@inject(SecurityBindings.USER) currentUser: UserProfile) {
    return {
      message: 'Welcome to Module 2',
      user: {id: currentUser.id, role: currentUser.role},
    };
  }

  @authenticate('jwt')
  @authorize({
    resource: 'module2',
    scopes: ['create'],
  })
  @get('/module2/create')
  async createModule2(@inject(SecurityBindings.USER) currentUser: UserProfile) {
    return {
      message: 'You can create in Module 2',
      user: {id: currentUser.id, role: currentUser.role},
    };
  }
}
