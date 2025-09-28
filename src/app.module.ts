import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HorsesModule } from './horses/horses.module';
import { DogsController } from './dogs/dogs.controller';
import { DogsService } from './dogs/dogs.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [HorsesModule],
  controllers: [AppController, DogsController],
  providers: [AppService, DogsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ 
      path: 'dogs', 
      method: RequestMethod.POST
    });
  }
}
