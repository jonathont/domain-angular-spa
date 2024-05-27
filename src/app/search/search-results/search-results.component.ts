import { Component } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'search-results',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './search-results.component.html',
    styles: ``
})
export class SearchResultsComponent {

    constructor(public service: SearchService) {

    }
}
