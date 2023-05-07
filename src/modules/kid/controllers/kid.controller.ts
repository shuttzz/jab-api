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

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string) {
    return this.kidService.findOne(id);
  }
}
