import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeDetail } from './fridge-detail';

describe('FridgeDetail', () => {
  let component: FridgeDetail;
  let fixture: ComponentFixture<FridgeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgeDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
