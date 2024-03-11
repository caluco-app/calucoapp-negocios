import { TestBed } from '@angular/core/testing';

import { ApiSucursalService } from './api-sucursal.service';

describe('ApiSucursalService', () => {
  let service: ApiSucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
