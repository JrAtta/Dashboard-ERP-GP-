import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewIndicatorComponent } from './overview-indicator.component';

describe('OverviewIndicatorComponent', () => {
  let component: OverviewIndicatorComponent;
  let fixture: ComponentFixture<OverviewIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
