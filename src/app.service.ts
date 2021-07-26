import * as cache from 'memory-cache'
import { generateKeyPairSync, publicEncrypt } from 'crypto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { authenticateUser, generateAuthToken, passphrase } from './tools/auth'
import { AuthTokenDto, UserRecordDto } from './types/app.dto'
import { DB } from '../db'
import { CacheUsersDto, EncryptedDto, RsaKeysDto } from './types/app.dto'
import axios from 'axios'

const db = new DB()

@Injectable()
export class AppService {
  cacheUsers(): CacheUsersDto {
    const db = new DB()
    db.init()

    return {
      cached: true,
    }
  }

  async signIn(email: string, password: string): Promise<AuthTokenDto> {
    try {
      const user = await db.findUser(email)
      await authenticateUser(user, password)
      const token = await generateAuthToken({ email: user.email })

      return {
        authToken: token,
      }
    } catch (_err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
  }

  associateKeys(user: UserRecordDto): RsaKeysDto {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: passphrase,
      },
    })

    // overwrite users cache with updated user
    const users = cache.get('users')
    const index = users.indexOf(user)
    user.privKey = privateKey
    user.pubKey = publicKey
    users[index] = user
    cache.put('users', users)

    return {
      pubKey: publicKey,
      privKey: privateKey,
    }
  }

  async encryptFile(publicKey): Promise<EncryptedDto> {
    try {
      const remoteFile = await axios({
        url: 'http://www.africau.edu/images/default/sample.pdf',
        method: 'GET',
        responseType: 'blob',
      })

      return {
        encrypted: publicEncrypt(
          publicKey,
          Buffer.from(remoteFile.data),
        ).toString('base64'),
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
