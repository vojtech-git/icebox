import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FridgeDetail } from './fridge-detail';
import { ActivatedRoute } from '@angular/router';
import { FridgeService } from '../../services/fridge.service';
import { of } from 'rxjs';

describe('FridgeDetail', () => {
  let component: FridgeDetail;
  let fixture: ComponentFixture<FridgeDetail>;

  beforeEach(async () => {
    // 1. Create a dummy service to intercept HTTP calls
    const mockFridgeService = {
      getFridgeById: () => of({ id: '123', name: 'Test Fridge', foodIds: [] }),
      getFoodById: () => of({ id: '1', name: 'Milk' })
    };

    await TestBed.configureTestingModule({
      imports: [FridgeDetail],
      providers: [
        // 2. Provide the mocked route URL parameters
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '123' } } }
        },
        // 3. Provide the mocked service
        {
          provide: FridgeService,
          useValue: mockFridgeService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});