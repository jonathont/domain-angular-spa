import { Component, Input } from '@angular/core';
import { DomainListingWithStops } from '../../shared/types/listing';
import { getDateWithoutTime, getRelativeShortDate, getTwelveHourTime } from '../../shared/utilities/dateTimeHelper';
import { environment as env } from '../../shared/environment';
import { NgIf } from '@angular/common';


type InspectionDay = {
    date: Date,
    inspections: InspectionTime[]
}
type InspectionTime = {
    imageSrc: string,
    openingTime: string,
    closingTime: string,
    address: string,
    listingSlug: string,
    isAuction: boolean,
    auctionTime: string | undefined,
}

@Component({
    selector: 'inspection-view',
    standalone: true,
    imports: [NgIf],
    template: `
        <div id="inspection-times-view" class="mx-3">
        @for (day of inspectionDays; track day.date) {
            <div>
                <div>{{ getShortDate(day.date.toISOString(), false, false) }}</div>
                <ul class="ps-0">
                    @for (inspection of day.inspections; track inspection) {
                        <li class="my-2">
                            <div class="d-flex item-container">
                                <a [href]="domainUrl + inspection.listingSlug" label="View" class="text-success text-decoration-none">
                                    <img [src]="inspection.imageSrc" class="inspection-thumbnail me-2" />
                                </a>
                                <div>{{getTwelveHourTime(inspection.openingTime)}} 
                                    <span *ngIf="inspection.isAuction" class="icon-wrapper text-danger"><i class="icon-hammer me-1"></i>
                                        {{getTwelveHourTime(inspection.auctionTime!)}}
                                    </span> <br />
                                    {{inspection.address}}
                                </div>
                            </div>
                        </li>
                    }
                </ul>
            </div>
        }
        </div>
    `,
    styles: `
        li {
            list-style-type: none;

            .inspection-thumbnail {
                width: 90px;
            }

            .item-container {
                align-items: center;
            }
        }
    `
})
export class InspectionViewComponent {

    @Input() results: DomainListingWithStops[] = [];

    inspectionDays: InspectionDay[] = [];

    domainUrl = env.domainUrl;
    getShortDate = getRelativeShortDate;
    getTwelveHourTime = getTwelveHourTime;
    
    ngOnInit() {
        const inspectionTimes = this.getInspectionTimesFronResults(this.results);
        const inspectionDays = this.groupInspectionTimesByDay(inspectionTimes);
        this.inspectionDays =  inspectionDays.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    getInspectionTimesFronResults(results: DomainListingWithStops[]): InspectionTime[] {
        return results && results.length > 0
            ? results.flatMap(x => {
                const inspectionTimesResult: InspectionTime[] = x.listing.inspectionSchedule?.times
                    .filter(t => t && new Date(t.openingTime) > new Date())
                    .map(y => {
                        const hasAuction = !!x.listing.auctionSchedule;
                        const isAuction = hasAuction && x.listing.auctionSchedule?.time == y.closingTime;
    
                        return {
                            imageSrc: x.listing.media[0].url,
                            openingTime: y.openingTime,
                            closingTime: y.closingTime,
                            address: x.listing.propertyDetails.displayableAddress,
                            listingSlug: x.listing.listingSlug,
                            isAuction: isAuction,
                            auctionTime: x.listing.auctionSchedule?.time
                        }
                    }) ?? [];
    
                return inspectionTimesResult;
            })
            : [];
    }

    groupInspectionTimesByDay(inspectionTimes: InspectionTime[]): InspectionDay[] {
        const inspectionDays: Map<number, InspectionDay> = new Map();
    
        const now = new Date();
        const futureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        inspectionTimes.map(x => {
            const openingDate = new Date(x.openingTime);
    
            if (openingDate > futureDate)
                return;
    
            const date = getDateWithoutTime(openingDate);
            const key = date.getTime();
    
            if (inspectionDays.get(key)) {
                inspectionDays.get(key)!.inspections.push(x);
            } else {
                inspectionDays.set(key, { date: date, inspections: [x] });
            }
            return x;
        })
        
        inspectionDays.forEach(d => 
            d.inspections = d.inspections.sort((a, b) => this.dateCompare(new Date(a!.openingTime), new Date(b!.openingTime)))
        );

        return Array.from(inspectionDays.values());
    }    
    
    dateCompare(first: Date, second: Date): number {
        return first < second
            ? -1
            : first == second
                ? 0
                : 1;
    }

}
