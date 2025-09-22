import {get, param, HttpErrors} from '@loopback/rest';
import {inject} from '@loopback/core';
import {JwtService} from '../services/jwt.service';

export class Module3Controller {
  constructor(@inject('services.JwtService') private jwtService: JwtService) {}

  @get('/module3')
  async module3(@param.header.string('Authorization') authHeader: string) {
    if (!authHeader) throw new HttpErrors.Unauthorized('Missing Authorization header');

    const token = authHeader.replace('Bearer ', '');
    let payload;
    try {
      payload = await this.jwtService.verifyToken(token);
    } catch (err) {
      throw new HttpErrors.Unauthorized('Invalid token');
    }

    if (payload.role !== 'admin') {
      throw new HttpErrors.Forbidden('You do not have access to Module 3');
    }

    return {message: 'Welcome to Module 3', user: payload};
  }
}
