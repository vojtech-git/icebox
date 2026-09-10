import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FridgeService } from './fridge.service';
import { FridgeDto } from '../models/fridge.model';

describe('FridgeService', () => {
  let service: FridgeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FridgeService]
    });
    service = TestBed.inject(FridgeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve fridges via GET', () => {
        const dummyFridges: FridgeDto[] = [{ id: '1', name: 'Kitchen', dateCreated: new Date().toISOString(), foodIds: [] }];
        
    service.getFridges().subscribe(fridges => {
      expect(fridges.length).toBe(1);
      expect(fridges).toEqual(dummyFridges);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/fridge');
    expect(req.request.method).toBe('GET');
    req.flush(dummyFridges);
  });

  it('should add food via POST', () => {
    service.addFood('fridge-1', 'Milk').subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/food');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.fridgeId).toBe('fridge-1');
    expect(req.request.body.name).toBe('Milk');
    req.flush({});
  });
});