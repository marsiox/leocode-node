import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

// Let's pretend this is in config
export const passphrase = 'this is not the passprase you are looking for'
export const jwtTtl = 5 * 60

export const generateAuthToken = (data): string => {
  return jwt.sign(
    {
      data: data,
      exp: Math.floor(Date.now() / 1000) + jwtTtl,
    },
    passphrase,
  )
}

export const hashPass = (password): Promise<string> => {
  return new Promise((resolve) => {
    bcrypt.genSalt(10, (_err: any, salt: string) => {
      bcrypt.hash(password, salt, (_err: any, hash: string) => {
        resolve(hash)
      })
    })
  })
}

export const authenticateUser = (user, password): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.encryptedPassword, (_err, isValid) => {
      if (isValid) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}
