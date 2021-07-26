export interface CacheUsersDto {
  cached: boolean
}

export interface RsaKeysDto {
  pubKey: string
  privKey: string
}

export interface EncryptedDto {
  encrypted: string
}

export interface CreateSessionDto {
  email: string
  password: string
}

export interface SessionResponseDto {
  authToken: string
}

export interface AuthTokenDto {
  authToken: string
}

export interface UserRecordDto {
  email: string
  encryptedPassword: string
  privKey: string
  pubKey: string
}

export interface CurrentUserRecordDto {
  currentUser: UserRecordDto
}
