import { Test, TestingModule } from '@nestjs/testing';
import { PartyViewersService } from './party-viewers.service';

describe('PartyViewersService', () => {
  let service: PartyViewersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartyViewersService],
    }).compile();

    service = module.get<PartyViewersService>(PartyViewersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
