import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCardComponent } from './listing-card.component';
import testResult from '../../shared/data/testResult';

describe('ListingCardComponent', () => {
  let component: ListingCardComponent;
  let fixture: ComponentFixture<ListingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingCardComponent);
    component = fixture.componentInstance;
    component.result = testResult;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
