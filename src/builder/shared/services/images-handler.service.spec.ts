import { TestBed } from '@angular/core/testing';

import { ImagesHandlerService } from './images-handler.service';

describe('ImagesHandlerService', () => {
  let service: ImagesHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
