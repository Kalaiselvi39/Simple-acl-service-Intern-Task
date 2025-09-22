import {get, param, HttpErrors} from '@loopback/rest';
import {inject} from '@loopback/core';
import {JwtService} from '../services/jwt.service';

export class Module2Controller {
  constructor(@inject('services.JwtService') private jwtService: JwtService) {}

  @get('/module2')
  async module2(@param.header.string('Authorization') authHeader: string) {
    if (!authHeader) throw new HttpErrors.Unauthorized('Missing Authorization header');

    const token = authHeader.replace('Bearer ', '');
    let payload;
    try {
      payload = await this.jwtService.verifyToken(token);
    } catch (err) {
      console.error('JWT verification failed:', err);
      throw new HttpErrors.Unauthorized('Invalid token');
    }

    // Role-based access for Module2 (admin and manager only)
    if (!['admin', 'manager'].includes(payload.role)) {
      throw new HttpErrors.Forbidden('You do not have access to Module 2');
    }

    return {message: 'Welcome to Module 2', user: payload};
  }
}
