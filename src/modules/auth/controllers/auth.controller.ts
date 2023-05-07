import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(ValidationPipe) credentials: CredentialsDto,
  ): Promise<{ token: string; parent: boolean }> {
    return this.authService.login(credentials);
  }
}
