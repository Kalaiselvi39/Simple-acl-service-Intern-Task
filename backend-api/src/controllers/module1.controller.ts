import {get, param, HttpErrors} from '@loopback/rest';
import {inject} from '@loopback/core';
import {JwtService} from '../services/jwt.service';
import fetch from 'node-fetch';

export class Module1Controller {
  constructor(@inject('services.JwtService') private jwtService: JwtService) {}

  @get('/module1')
  async module1(@param.header.string('Authorization') authHeader: string) {
    if (!authHeader) throw new HttpErrors.Unauthorized('Missing Authorization header');

    const token = authHeader.replace('Bearer ', '');
    let payload;
    try {
      payload = await this.jwtService.verifyToken(token);
    } catch (err) {
      throw new HttpErrors.Unauthorized('Invalid token');
    }

    // Role-based access
    if (!['admin', 'manager', 'user'].includes(payload.role)) {
      throw new HttpErrors.Forbidden('You do not have access to Module 1');
    }

    const response=await fetch('https://dummyjson.com/users');

    if(!response.ok){
      throw new HttpErrors.InternalServerError('Failed to fetch the users');
    }
     const users=await response.json();
    return {message: 'Welcome to Module 1', user: payload,dummyUsers:users};
  }
}
