import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { Dog } from './interfaces/dog.interface';
import { CreateDogDto } from './dto/create-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Post()
  async create(@Body() createDogDto: CreateDogDto) {
    this.dogsService.create(createDogDto);
  }

  @Get()
  async findAll(): Promise<Dog[]> {
    return this.dogsService.findAll();
  }

  @Get('breed/:breed')
  async findAllByBreed(@Param('breed') breed: string): Promise<Dog[]> {
    return this.dogsService.findAllByBreed(breed);
  }
}
