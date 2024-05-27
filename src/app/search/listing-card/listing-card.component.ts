import { Component, Input } from '@angular/core';
import { Advertiser, DomainListingWithStops, NearbyStop, Time } from '../../shared/types/listing';
import { environment as env } from '../../shared/environment';
import { getRelativeShortDate, getTwelveHourTime } from '../../shared/utilities/dateTimeHelper';
import { CommonModule } from '@angular/common';
import { SimpleCarouselComponent } from './simple-carousel/simple-carousel.component';
import { ListingAgencyComponent } from './listing-agency/listing-agency.component';
import { ListingProgressBarComponent } from './listing-progress-bar/listing-progress-bar.component';
import { ListingAddedTagComponent } from './listing-added-tag/listing-added-tag.component';
import { ListingInspectionTimesComponent } from './listing-inspection-times/listing-inspection-times.component';

interface ListingStop {
    name: string;
    rotation: string;
    distance: string;
    href: string;
}

@Component({
    selector: 'listing-card',
    standalone: true,
    imports: [CommonModule, 
              SimpleCarouselComponent,
              ListingAddedTagComponent,
              ListingAgencyComponent, 
              ListingInspectionTimesComponent,
              ListingProgressBarComponent, 
              SimpleCarouselComponent],
    templateUrl: './listing-card.component.html',
    styleUrl: './listing-card.component.scss'
})
export class ListingCardComponent {

    @Input() result!: DomainListingWithStops;

    href: string = '';
    streetAddress: string = '';
    imageAltText: string = '';
    agent?: Advertiser;

    closestStops: ListingStop[] = [];
    imaegUrls: string[] = [];
    propertyType: string = '';

    isAuctionTimeInFuture: boolean = false;
    openTimes: Time[] = [];
    openTime?: string = '';
    openTimeDisplay?: string = '';
    auctionDate?: string = '';
    auctionDateDisplay?: string = '';

    constructor() {
    }

    ngOnInit() {
        this.href = env.domainUrl + this.result.listing.listingSlug;
        this.streetAddress = this.result.listing.propertyDetails.unitNumber
            ? `${this.result.listing.propertyDetails.unitNumber}/${this.result.listing.propertyDetails.streetNumber} ${this.result.listing.propertyDetails.street}`
            : `${this.result.listing.propertyDetails.streetNumber} ${this.result.listing.propertyDetails.street}`;
        this.agent = this.result.listing.advertiser;
        this.imageAltText = `Image for ${this.streetAddress}`;
        this.imaegUrls = (this.result.listing.media ?? [])
            .filter(x => x.category === "Image")
            .map(y => `${y.url}/500x500`);

        this.getClosestStops(this.result.closestStops);
        this.propertyType = this.getPropertyType(this.result.listing.propertyDetails.propertyType, 
                                                 this.result.listing.propertyDetails.unitNumber, 
                                                 this.result.listing.summaryDescription);

        this.isAuctionTimeInFuture = this.result?.listing?.auctionSchedule
            && this.result.listing.auctionSchedule.time
            && new Date(this.result.listing.auctionSchedule.time) > new Date()
            ? true : false;

            this.openTimes = (this.result?.listing?.inspectionSchedule?.times ?? []).filter(x => new Date(x.openingTime) > new Date());

            this.openTime = this.openTimes[0]
                ? getRelativeShortDate(this.openTimes[0].openingTime, true, false)
                : undefined;
            this.openTimeDisplay = this.openTime?.toLowerCase() === 'today' ? getTwelveHourTime(this.openTimes[0].openingTime) : this.openTime;
        
            this.auctionDate = this.result?.listing?.auctionSchedule?.time
                ? getRelativeShortDate(this.result.listing.auctionSchedule.time, false, false)
                : undefined;
            this.auctionDateDisplay = this.auctionDate?.toLowerCase() === 'today' ? getTwelveHourTime(this.result.listing.auctionSchedule!.time) : this.auctionDate;
        

    }

    private getClosestStops(stops: NearbyStop[]) {
        stops
            .filter((_, i: number) => { return i < 2 })
            .map<ListingStop>(s => {
                const distance = Math.round(s.distance * 10) / 10;
                const distanceToDisplay = distance < 1 ? distance * 1000 : distance;
                const units = distance < 1 ? 'm' : 'km';

                return {
                    name: s.stop_name,
                    rotation: `${s.bearing - 45}deg`,
                    distance: distanceToDisplay + units,
                    href: `https://www.google.com/maps/dir/${this.result.listing.propertyDetails.latitude},${this.result.listing.propertyDetails.longitude}/${s.latitude},${s.longitude}/data=!3m1!4b1!4m2!4m1!3e2`
                } as ListingStop;
            })
    }

    getPropertyType(propertyType: string, unitNumber: string, description: string) {
        switch (propertyType.toLowerCase()) {
            case "NewApartments".toLowerCase():
                return "New Apartment"
            case "ApartmentUnitFlat".toLowerCase():
                // Check the description first, to see if apartment or unit are mentioned
                if (description.toLowerCase().indexOf("apartment") >= 0) {
                    return "Apartment";
                }
                if (description.toLowerCase().indexOf("unit") >= 0) {
                    return "Unit";
                }

                // If it's only numeric, use the value to guess if it's an apartment
                if (new RegExp(/^\d+$/).test(unitNumber)) {
                    const numericUnitNumber = parseInt(unitNumber);

                    // If it's > 99, it's almost definitely an apartment
                    if (numericUnitNumber > 99) {
                        return "Apartment";
                    }

                    // If it's < 20, it's possibly a unit
                    if (numericUnitNumber < 30) {
                        return "Unit";
                    }
                } else {
                    // If it contains a G, it's likely a ground floor apartment
                    if (unitNumber.toLowerCase().indexOf("g") >= 0) {
                        return "Apartment";
                    }

                    // If it contains an A or B, it's potentially a subdivision so likely a unit
                    if (new RegExp(/[ABab]/).test(unitNumber)) {
                        return "Unit";
                    }
                }

                // If nothing matched, return a combined value
                return "Apartment / Unit";
            case "House".toLowerCase():
            case "Townhouse".toLowerCase():
            default:
                return propertyType;
        }

    }

}
