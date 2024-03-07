import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class CheckUserIdMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const decodedToken = this.decodeToken(token);

      const userIdFromToken = decodedToken ? decodedToken.sub : null;

      const userIdFromParams =req.params.id;

      if (userIdFromToken !== null && userIdFromToken == userIdFromParams) {
        console.log(userIdFromParams)
        next();
      } else {
        throw new ForbiddenException('Forbidden');
      }
    } catch (error) {
      throw new ForbiddenException('Forbidden');
    }
  }

  private decodeToken(token: string) {
    try {
      const decoded = jwtDecode(token);

      return decoded;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        console.error('Error decoding token:', error.message);
      } else {
        console.error('Unexpected error decoding token:', error);
      }
      return null;
    }
  }
}
