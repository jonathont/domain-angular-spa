import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment as env } from '../../shared/environment';
import DomainListingWrapper, { ClosestStop, DomainListingWithStops } from '../../shared/types/listing';
import findClosestStops from '../../shared/utilities/distance';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface SearchFilters {
    minBeds: number;
    minBaths: number;
    minCarSpaces: number;
    maxPrice: number;
    suburbs: string[];
    maxDistanceFromTrain: number;
}

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private apiKey?: string;
    private url = env.apiUrl + this.apiKey;

    public isLoading = signal<boolean>(false);
    public searchError = signal<string | null>(null);
    public searchResults = signal<DomainListingWithStops[]>([]);

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        route.queryParams.subscribe(p => this.apiKey = p['api_key']);
    }

    private getSearchParams(filters: SearchFilters, page: number, pageSize: number): any {

        return {
            "listingType": "Sale",
            "propertyTypes": [
                "House",
                "NewApartments",
                "ApartmentUnitFlat",
                "Townhouse"
            ],
            "listingAttributes": [
                "NotUnderContract"
            ],
            "minBedrooms": filters.minBeds,
            "minBathrooms": filters.minBaths,
            "minCarspaces": filters.minCarSpaces,
            "maxPrice": filters.maxPrice,
            "locations": filters.suburbs,
            "sort": {
                "sortKey": "DateListed",
                "direction": "Descending"
            },
            "pageSize": pageSize,
            "pageNumber": page
        };

    }

    private addStopDistanceToListings(listings: DomainListingWrapper[], skip: boolean = false): DomainListingWithStops[] {
        let resultsWithLatLng = listings
            .filter(x => {
                return x?.listing?.propertyDetails
                    && x.listing.propertyDetails.latitude
                    && x.listing.propertyDetails.longitude;
            });

        return resultsWithLatLng.map(x => {
            const closestStops: ClosestStop[] = skip ? [] : findClosestStops(x.listing.propertyDetails.latitude, x.listing.propertyDetails.longitude);
            return { ...x, closestStops: closestStops };
        });
    }

    private filterListingsByStopDistance(listings: DomainListingWithStops[], maxDistance: number): DomainListingWithStops[] {
        return listings.filter(x => {
            return x.closestStops.length > 0
                && Math.round(x.closestStops[0].distance * 10) / 10 <= maxDistance;
        })
    }

    private fetchListings(filters: SearchFilters, page: number, pageSize: number): Observable<DomainListingWrapper[]> {
        if (this.apiKey)
            return this.http.post<DomainListingWrapper[]>(this.url, this.getSearchParams(filters, page, pageSize))
        else
            return this.http.get<DomainListingWrapper[]>(env.mockDataUrl);
    }

    getSearchResults(filters: SearchFilters, state: string, page: number, pageSize: number) {
        let computeStopDistance = state === 'VIC';

        let listings = 
            this.fetchListings(filters, page, pageSize)
                .pipe(map(results => this.addStopDistanceToListings(results, computeStopDistance)));

        if (computeStopDistance)                        
            listings = listings.pipe(map(results => this.filterListingsByStopDistance(results, filters.maxDistanceFromTrain)));

        this.isLoading.set(true);
        this.searchError.set(null);

        listings
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: results => this.searchResults.set(results),
                error: error => this.searchError.set(error),
                complete: () => this.isLoading.set(false)
            });

        return listings;
    }


}
