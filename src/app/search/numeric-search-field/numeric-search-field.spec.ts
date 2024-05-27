import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericSearchFieldComponent } from './numeric-search-field.component';

describe('NumericSearchFieldComponentComponent', () => {
  let component: NumericSearchFieldComponent;
  let fixture: ComponentFixture<NumericSearchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericSearchFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumericSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
