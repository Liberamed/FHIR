import { Test, TestingModule } from '@nestjs/testing'
import { CodingController } from './coding.controller'

describe('Coding Controller', () => {
  let controller: CodingController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodingController]
    }).compile()

    controller = module.get<CodingController>(CodingController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
