import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerExpensesComponent } from './customer-expenses.component';

describe('CustomerExpensesComponent', () => {
  let component: CustomerExpensesComponent;
  let fixture: ComponentFixture<CustomerExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
