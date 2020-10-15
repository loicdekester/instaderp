import { TestBed } from '@angular/core/testing';

import { MyFireService } from './my-fire.service';

describe('MyFireService', () => {
  let service: MyFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
