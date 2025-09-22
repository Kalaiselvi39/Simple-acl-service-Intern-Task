import {post, requestBody, HttpErrors} from '@loopback/rest';
import {inject} from '@loopback/core';
import {JwtService} from '../services/jwt.service';
import {UserRepository} from '../repositories';
import {repository} from '@loopback/repository';
export class LoginController {
  constructor(
    @inject('services.JwtService') private jwtService: JwtService,
    @repository(UserRepository) private userRepo: UserRepository,
  ) {}
  @post('/login')
  async login(@requestBody() credentials: {username: string; password: string}) {
    const user = await this.userRepo.findOne({
      where: {username: credentials.username, password: credentials.password},
    });
    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');
    const token = await this.jwtService.generateToken({
      id: user.id,
      role: user.role,
    });
    return {token, role: user.role};
  }
}
