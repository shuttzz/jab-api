import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ParentController } from './controllers/parent.controller';
import { ParentService } from './services/parent.service';
import { PrismaService } from '../database/prisma.service';
import { authProvider } from './providers/auth.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RegisterModule } from '../register/register.module';

@Module({
  controllers: [AuthController, ParentController],
  providers: [
    ...authProvider,
    AuthService,
    ParentService,
    PrismaService,
    JwtStrategy,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('APP_AUTH_SECRET'),
          signOptions: { expiresIn: config.get('APP_AUTH_EXPIRES_IN') },
        };
      },
      inject: [ConfigService],
    }),
    RegisterModule,
  ],
})
export class AuthModule {}
