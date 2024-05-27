import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuburbSearchComponent } from '../suburb-search/suburb-search.component';
import { NumericSearchFieldComponent } from '../numeric-search-field/numeric-search-field.component';
import { SearchService } from '../../services/search/search.service';
import { getSuburbOptionsForState, Option } from '../../shared/data/allSuburbOptions';
import { Observable, switchMap } from 'rxjs';
import { DomainListingWithStops } from '../../shared/types/listing';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'search',
    standalone: true,
    imports: [CommonModule, FormsModule, SuburbSearchComponent, NumericSearchFieldComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent {

    states: string[] = ["VIC", "NSW", "WA", "NT", "SA", "QLD", "TAS", "ACT"];
    selectedState: string = "VIC";
    suburbOptions: Option[] = [];

    suburbs: string[] = [];

    minBeds: number = 2;
    minBaths: number = 1;
    minCarSpaces: number = 2;
    maxPrice: number = 750000;
    maxDistanceFromTrain: number = 1;

    searchResults$ = new Observable<DomainListingWithStops[]>();

    private apiKey?: string;

    constructor(public searchService: SearchService, private route: ActivatedRoute) {
        this.onStateChanged(this.selectedState);
    }

    ngOnInit() {
        if (!this.apiKey || this.apiKey == '') {
            this.suburbs = ['Melbourne'];
            this.search();
        }
    }

    onStateChanged(newState: string) {
        this.suburbOptions = getSuburbOptionsForState(newState);
    }

    onSuburbsChanged(suburbs: string[]) {
        this.suburbs = suburbs;
    }

    updateFilters() {
    }

    search() {
        this.searchResults$ = this.searchService.getSearchResults({
            minBeds: this.minBeds,
            minBaths: this.minBaths,
            minCarSpaces: this.minCarSpaces,
            maxPrice: this.maxPrice,
            suburbs: this.suburbs,
            maxDistanceFromTrain: this.maxDistanceFromTrain
        }, this.selectedState, 1, 10);
    }

}
