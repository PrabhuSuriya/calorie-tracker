import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt-helper';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];

    if (
      authorization === undefined ||
      authorization.split(' ')[0] !== 'Bearer'
    ) {
      const status = 401;
      const message = 'Bad authorization header';
      res.status(status).json({ status, message });
      return;
    }

    try {
      const token = authorization.split(' ')[1];
      const user = verifyToken(token);
      // console.log('v', user);
      req['user'] = user;
      next();
      return;
    } catch (err) {
      const status = 401;
      const message = 'Error: access_token is not valid';
      res.status(status).json({ status, message });
      return;
    }
  }
}
