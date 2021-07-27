import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import { DB } from '../../db'
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { passphrase } from '../tools/auth'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token')
    if (!token) {
      throw new HttpException('Token Required', HttpStatus.BAD_REQUEST)
    }
    jwt.verify(token, passphrase, (err, decoded) => {
      if (err) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
      }
      const { email } = decoded.data
      const db = new DB()
      const user = db.findUser(email)
      req.body.currentUser = user
    })

    if (req.body.currentUser) {
      next()
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
  }
}
