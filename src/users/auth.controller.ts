import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Res() res: Response) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (user) {
      return res.json({ success: true, role: user.role });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  }
}
