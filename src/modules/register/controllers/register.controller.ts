import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterService } from '../services/register.service';
import { CreateRegisterDto } from '../dto/create-register.dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';

@Controller('movimentations')
@UseGuards(AuthGuard())
export class RegisterController {
  constructor(private readonly service: RegisterService) {}

  @Post(':kidId')
  async movimentationParent(
    @Body(ValidationPipe) body: CreateRegisterDto,
    @Param('kidId') id: string,
  ) {
    return this.service.movimentation(body, id);
  }

  @Post()
  async movimentationKid(
    @Body(ValidationPipe) body: CreateRegisterDto,
    @GetUser() user: { id: string },
  ) {
    return this.service.movimentation(body, user.id);
  }

  @Get(':kidId')
  async findAllParent(@Param('kidId') id: string) {
    return this.service.findAll(id);
  }

  @Get()
  async findAllKid(@GetUser() user: { id: string }) {
    return this.service.findAll(user.id);
  }
}
