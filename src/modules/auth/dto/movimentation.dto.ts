import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class MovimentationDto {
  id?: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @MinLength(5, { message: 'Descrição precisa ter ao menos 5 caracteres' })
  @MaxLength(100, { message: 'Descrição não pode ter mais que 100 caracteres' })
  description: string;

  @IsNotEmpty({ message: 'Tipo da movimentação é obrigatório' })
  type: string;

  @IsNotEmpty({ message: 'Valor é obrigatório' })
  value: number;
}
