import { Controller, Get, Post, Delete, Body, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Dog> {
    const dog = this.dogsService.findOne(id - 1);
    if (!dog) throw new NotFoundException(`Dog ${id} not found.`);
    return dog;
  }

  @Get('breed/:breed')
  async findAllByBreed(@Param('breed') breed: string): Promise<Dog[]> {
    return this.dogsService.findAllByBreed(breed);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Dog> {
    const dog = this.dogsService.findOne(+id - 1);
    if (!dog) throw new NotFoundException(`Dog ${id} not found.`);
    return dog;
  }
}
