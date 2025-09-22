import { HttpErrors} from '@loopback/rest';
import {injectable, BindingScope} from '@loopback/core';
import jwt, {SignOptions, Secret} from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  private jwtSecret: Secret = process.env.JWT_SECRET ?? 'backend-secret';
  private rounds = 10;
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.rounds);
  }

  async comparePassword(provided: string, stored: string): Promise<boolean> {
    return bcrypt.compare(provided, stored);
  }
  async generateToken(payload: object): Promise<string> {
    try {
      const options: SignOptions = {expiresIn: 3600};
       //console.log('JWT secret used for signing:', this.jwtSecret);
      return jwt.sign(payload, this.jwtSecret, options);
    } catch (err) {
      throw new Error('Error generating token');
    }
  }
  
}
