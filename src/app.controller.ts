import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { CacheUsersDto, CurrentUserRecordDto } from './types/app.dto'
import { CreateSessionDto } from './types/app.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async cacheUsers(): Promise<CacheUsersDto> {
    return this.appService.cacheUsers()
  }

  @Post('sign-in')
  async signIn(@Body() body: CreateSessionDto) {
    return this.appService.signIn(body.email, body.password)
  }

  @Post('generate-key-pair')
  async generateKeys(@Body() body: CurrentUserRecordDto) {
    const currentUser = await body.currentUser
    return this.appService.associateKeys(currentUser)
  }

  @Post('encrypt')
  async encryptFile(@Body() body) {
    const currentUser = await body.currentUser
    return this.appService.encryptFile(currentUser.pubKey)
  }
}
