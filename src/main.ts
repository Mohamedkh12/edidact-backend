import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './roles/guards/rôles.guard';
import { JwtAuthGuards } from './auth/guards/jwt-auth.guards';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RolesGuard(new Reflector()))
  await app.listen(3000);
}
bootstrap();
