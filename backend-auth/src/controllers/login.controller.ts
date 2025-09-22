import {post, requestBody, HttpErrors} from '@loopback/rest';
import {inject} from '@loopback/core';
import {AuthService} from '../services/jwt.service';
import {UserRepository} from '../repositories/user.repository';
import {repository} from '@loopback/repository';
import * as bcrypt from 'bcrypt';
export class LoginController {
  constructor(
    @inject('services.AuthService') private authService: AuthService,
    @repository(UserRepository) private userRepo: UserRepository,
  ) {}
    @post('/register')
  async register(
    @requestBody() newUser: {username: string; password: string; role: string},
  ) {
    const existingUser = await this.userRepo.findOne({
      where: {username: newUser.username},
    });
    
    if (existingUser) {
      throw new HttpErrors.BadRequest('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const savedUser = await this.userRepo.create({
      username: newUser.username,
      password: hashedPassword,
      role: newUser.role,
    });
   

    return {
      message: 'User registered successfully',
      userId: savedUser.id,
      username: savedUser.username,
      role: savedUser.role,
    };
  }
  @post('/login')
  async login(@requestBody() credentials: {username: string; password: string}) {
    const user = await this.userRepo.findOne({
      where: {username: credentials.username},
    });
    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) throw new HttpErrors.Unauthorized('Invalid credentials');
    const token = await this.authService.generateToken({
      id: user.id,
      role: user.role,
    });
    return {token, role: user.role};
  }
}
