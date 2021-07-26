import * as cache from 'memory-cache'
import { UserRecordDto } from 'src/types/app.dto'

export class DB {
  users: UserRecordDto[] = [
    {
      email: 'one@yo.com',
      encryptedPassword:
        '$2b$10$ST3118a3oSDchqIzopX7P.WrKD6bLxVsK.5WqM/26mCpgJ7xvnFai',
      privKey: '',
      pubKey: '',
    },
    {
      email: 'two@yo.com',
      encryptedPassword:
        '$2b$10$lN9JpSnkE7r6oUnQNnbgKO8dK2RQa///P9g6pJhgmUc.GX77uSPEC',
      privKey: '',
      pubKey: '',
    },
  ]

  init(): void {
    cache.put('users', this.users)
  }

  findUser(email: string): Promise<UserRecordDto> {
    const users = cache.get('users')

    return new Promise((resolve, reject) => {
      const user = users.find((el) => el.email === email)
      if (user) {
        resolve(user)
      } else {
        reject('User not found')
      }
    })
  }
}
