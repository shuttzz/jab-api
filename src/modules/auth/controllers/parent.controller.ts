import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateParentDto } from '../dto/create-parent.dto';
import { ParentService } from '../services/parent.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';

export type Children = {
  id: string;
  name: string;
  savedValue: number;
  amountToSpend: number;
};

export type Movimentation = {
  id: string;
  createdAt: Date;
  description: string;
  value: number;
  type: string;
};

export type OneChildren = {
  id: string;
  name: string;
  savedValue: number;
  amountToSpend: number;
  movimentations: Movimentation[];
};

@Controller('parents')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post()
  async create(@Body(ValidationPipe) createParentDto: CreateParentDto) {
    return this.parentService.create(createParentDto);
  }

  @Get('children')
  @UseGuards(AuthGuard())
  async children(@GetUser() user: { id: string }): Promise<Children[]> {
    return this.parentService.children(user.id);
  }

  @Get('children/:kidId')
  @UseGuards(AuthGuard())
  async findOneKid(@Param('kidId') id: string): Promise<OneChildren> {
    return this.parentService.oneKid(id);
  }
}
