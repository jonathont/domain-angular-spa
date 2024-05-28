import { Component, computed, signal } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { InspectionViewComponent } from '../inspection-view/inspection-view.component';
import { DomainListingWithStops } from '../../shared/types/listing';
import { LocalStorageService } from '../../services/local-storage.service';
import { SuburbSummaryComponent } from '../suburb-summary/suburb-summary.component';

@Component({
    selector: 'search-results',
    standalone: true,
    imports: [CommonModule, NgbNavModule, ListingCardComponent, InspectionViewComponent, SuburbSummaryComponent],
    templateUrl: './search-results.component.html',
    styles: `
    
    .loader {
        width: 48px;
        height: 48px;
        border: 3px solid #FFF;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    } 
    .loader::after {
        content: '';  
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-bottom-color: #FF3D00;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }     
    
    .nav-link:not(:hover) {
        color: var(--bs-nav-tabs-link-active-color);
    }
    .loading-block {
        text-align: center;
    }

    `
})
export class SearchResultsComponent {

    activeTab: number = 1;
    archivedSlugs = signal<string[]>([]);

    showSuburbs: boolean = false;
    showArchived = signal<boolean>(false);

    filteredSearchResults = computed(() => 
        this.service.searchResults()
                    .filter(r => this.showArchived() || !this.isArchived(r))
    );

    constructor(public service: SearchService, private localStorage: LocalStorageService) {
       this.archivedSlugs.set(localStorage.getArchived());
    }

    ngOnInit() {
    }

    isArchived(result: DomainListingWithStops) {
        return this.archivedSlugs().find(s => result.listing.listingSlug === s) != null;
    }

    onArchivedChanged(result: DomainListingWithStops, archived: boolean) {
        if (archived && !this.isArchived(result))
            this.archivedSlugs.set([...this.archivedSlugs(), result.listing.listingSlug]);
        else if (!archived)
            this.archivedSlugs.set(this.archivedSlugs().filter(s => s !== result.listing.listingSlug));
        
        this.localStorage.saveArchived(this.archivedSlugs());
    }

}
