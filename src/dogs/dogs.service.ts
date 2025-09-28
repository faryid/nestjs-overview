import { Injectable } from '@nestjs/common';
import { Dog } from './interfaces/dog.interface';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  create(dog: Dog) {
    this.dogs.push(dog);
  }

  findAll(): Dog[] {
    return this.dogs;
  }

  findOne(id: number): Dog {
    return this.dogs[id];
  }

  findAllByBreed(breed: string): Dog[] {
    return  this.dogs.filter(dog => dog.breed === breed);
  }

  remove(id: number): Dog {
    return this.dogs.splice(id, 1)[0];    
  }
}
