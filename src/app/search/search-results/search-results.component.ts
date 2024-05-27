import { Component } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ListingCardComponent } from '../listing-card/listing-card.component';

@Component({
    selector: 'search-results',
    standalone: true,
    imports: [CommonModule, NgbNavModule, ListingCardComponent],
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

    constructor(public service: SearchService) {

    }
}
