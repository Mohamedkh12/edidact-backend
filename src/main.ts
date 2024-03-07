import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './roles/guards/rôles.guard';
import { CheckUserIdMiddleware } from './auth/middleware/enregistreur.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();
