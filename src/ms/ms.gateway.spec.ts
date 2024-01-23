import { Test, TestingModule } from '@nestjs/testing';
import { MsGateway } from './ms.gateway';

describe('MsGateway', () => {
  let gateway: MsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsGateway],
    }).compile();

    gateway = module.get<MsGateway>(MsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
