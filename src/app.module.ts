import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthMiddleware } from './middleware/auth.middleware'

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('generate-key-pair', 'encrypt')
  }
}
