import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/GET', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect({ cached: true })
  })

  it('/POST sign-in', () => {
    return request(app.getHttpServer())
      .post('/api/sign-in')
      .send({ email: 'one@yo.com', password: 'password1' })
      .expect(201)
  })

  it('/POST sign-in fails', () => {
    return request(app.getHttpServer())
      .post('/api/sign-in')
      .send({ email: 'one@yo.com', password: 'password2' })
      .expect(401)
  })

  it('/POST generate-key-pair token required', () => {
    return request(app.getHttpServer())
      .post('/api/generate-key-pair')
      .expect(400)
      .expect({ statusCode: 400, message: 'Token Required' })
  })
})
