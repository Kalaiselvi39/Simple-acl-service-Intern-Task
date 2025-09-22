import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Request} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {JwtService} from './jwt.service';

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(@inject('services.JwtService') private jwtService: JwtService) {}

  async authenticate(request: Request): Promise<UserProfile> {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    const payload = await this.jwtService.verifyToken(token);

    if (!payload) {
      throw new Error('Invalid token');
    }

    return {
      [securityId]: String(payload.id),
      id: payload.id,
      role: payload.role, // make sure role exists in JWT
    };
  }
}
