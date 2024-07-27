import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureEditAmountComponent } from './feature-edit-amount.component';

describe('FeatureEditAmountComponent', () => {
  let component: FeatureEditAmountComponent;
  let fixture: ComponentFixture<FeatureEditAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureEditAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureEditAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
