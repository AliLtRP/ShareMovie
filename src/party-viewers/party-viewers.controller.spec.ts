import { Test, TestingModule } from '@nestjs/testing';
import { PartyViewersController } from './party-viewers.controller';
import { PartyViewersService } from './party-viewers.service';

describe('PartyViewersController', () => {
  let controller: PartyViewersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartyViewersController],
      providers: [PartyViewersService],
    }).compile();

    controller = module.get<PartyViewersController>(PartyViewersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
