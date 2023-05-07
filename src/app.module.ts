import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { RegisterModule } from './modules/register/register.module';
import { KidModule } from './modules/kid/kid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    AuthModule,
    WalletModule,
    RegisterModule,
    KidModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
