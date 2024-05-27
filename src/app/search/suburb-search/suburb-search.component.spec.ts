import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuburbSearchComponent } from './suburb-search.component';

describe('SuburbSearchComponent', () => {
  let component: SuburbSearchComponent;
  let fixture: ComponentFixture<SuburbSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuburbSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuburbSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
