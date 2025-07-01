import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalChartsComponent } from './total-charts.component';

describe('TotalChartsComponent', () => {
  let component: TotalChartsComponent;
  let fixture: ComponentFixture<TotalChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
