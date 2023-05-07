import {
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRegisterDto {
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @MinLength(5, { message: 'Descrição precisa ter ao menos 5 caracteres' })
  @MaxLength(100, { message: 'Descrição não pode ter mais que 255 caracteres' })
  description: string;

  @IsNotEmpty({ message: 'Valor é obrigatório' })
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Valor precisa ser um número' })
  @Min(0.01, { message: 'Valor precisar ser maior que zero' })
  value: number;

  @IsNotEmpty({ message: 'Tipo é obrigatório' })
  type: string;
}
