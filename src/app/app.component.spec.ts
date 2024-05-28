import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientModule],
      providers: [provideRouter([{path: '', component: AppComponent}])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Domain Property Search' heading`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const el: HTMLElement = fixture.nativeElement;
    const h3 = el.querySelector('h3');

    expect(h3).toBeTruthy();
    expect(h3?.textContent).toEqual('Domain Property Search');
  });
});
