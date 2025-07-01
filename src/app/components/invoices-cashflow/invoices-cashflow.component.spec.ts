import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesCashflowComponent } from './invoices-cashflow.component';

describe('InvoicesCashflowComponent', () => {
  let component: InvoicesCashflowComponent;
  let fixture: ComponentFixture<InvoicesCashflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesCashflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesCashflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
