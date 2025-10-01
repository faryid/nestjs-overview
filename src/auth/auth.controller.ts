import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login/v1')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/jwt/v1')
  signInJwt(@Body() signInDto: Record<string, any>) {
    return this.authService.signInJwt(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('jwt/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login/passport/v1')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuardPassport('local'))
  // @Post('logout/passport/v1')
  // async logout(@Request() req) {
  //   return req.logout();
  // }

  @UseGuards(JwtAuthGuard)
  @Get('passport/profile')
  async getPassportProfile(@Request() req) {
    return req.user;
  }
}
