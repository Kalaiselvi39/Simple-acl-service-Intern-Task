import {injectable, BindingScope} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import jwt, {SignOptions, Secret} from 'jsonwebtoken';
@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  private jwtSecret: Secret = process.env.JWT_SECRET ?? 'fallback-secret';
  private expiresIn = process.env.JWT_EXPIRES_IN ?? '1h';
  async generateToken(payload: object): Promise<string> {
    try {
      const options: SignOptions = {expiresIn: 3600};
      return jwt.sign(payload, this.jwtSecret, options);
    } catch (err) {
      throw new Error('Error generating token');
    }
  }
  async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (err) {
      throw new HttpErrors.Unauthorized('Invalid token');
    }
  }
}
