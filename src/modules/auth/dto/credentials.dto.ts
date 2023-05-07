import { IsEmail, IsNotEmpty } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsEmail()
  public email: string;
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  public password: string;
}
