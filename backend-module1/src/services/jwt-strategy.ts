import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Request} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {JwtService} from './jwt.service';

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(
    @inject('services.JwtService')
    private jwtService: JwtService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const token = authHeader.replace('Bearer ', '').trim();
    console.log('Extracted token:', token);

    const payload = await this.jwtService.verifyToken(token);
    
    // Return a UserProfile (this gets stored in context.principals[0])
    return {
      [securityId]: String(payload.id),
      id: payload.id,
      role: payload.role,
    };
  }
}
