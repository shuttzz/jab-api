import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { KidService } from '../services/kid.service';
import { CreateKidDto } from '../dto/create-kid.dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { OneChildren } from '../../auth/controllers/parent.controller';

@Controller('kids')
export class KidController {
  constructor(private readonly kidService: KidService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body(ValidationPipe) createKidDto: CreateKidDto,
    @GetUser() user: { id: string },
  ) {
    return this.kidService.create(createKidDto, user.id);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findOne(@GetUser() user: { id: string }): Promise<OneChildren> {
    return this.kidService.findOne(user.id);
  }
}
