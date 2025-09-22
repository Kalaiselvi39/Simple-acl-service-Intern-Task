import {injectable, BindingScope} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import jwt, {SignOptions, Secret} from 'jsonwebtoken';

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
 
  private jwtSecret: Secret = process.env.JWT_SECRET ?? 'backend-secret';
  
  async verifyToken(token: string): Promise<any> {
    try {
      
      return jwt.verify(token, this.jwtSecret);
    } catch (err) {
      throw new HttpErrors.Unauthorized('Invalid token');
    }
  }
}
