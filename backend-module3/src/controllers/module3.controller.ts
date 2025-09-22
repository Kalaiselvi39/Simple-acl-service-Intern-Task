import {get} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';

export class Module3Controller {
  constructor() {}

  // Read access
  @authenticate('jwt')
  @authorize({
    resource: 'module3',
    scopes: ['find'], // maps to ACL.property
  })
  @get('/module3')
  async getModule3(@inject(SecurityBindings.USER) currentUser: UserProfile) {
    return {
      message: 'Welcome to Module 3',
      user: {id: currentUser.id, role: currentUser.role},
    };
  }

  // Create access
  @authenticate('jwt')
  @authorize({
    resource: 'module3',
    scopes: ['create'], // maps to ACL.property
  })
  @get('/module3/create')
  async createModule3(@inject(SecurityBindings.USER) currentUser: UserProfile) {
    return {
      message: 'You can create in Module 3',
      user: {id: currentUser.id, role: currentUser.role},
    };
  }
}
