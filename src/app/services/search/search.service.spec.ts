import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultsComponent } from '../../search/search-results/search-results.component';
import { provideRouter } from '@angular/router';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [provideRouter([{path: '', component: SearchResultsComponent}])]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
