import { Component, Input } from '@angular/core';
import { AuctionSchedule, InspectionSchedule, Time } from '../../../shared/types/listing';
import { getDateRange, getShortDateAndTime } from '../../../shared/utilities/dateTimeHelper';

@Component({
    selector: 'listing-inspection-times',
    standalone: true,
    imports: [],
    template: `
        <span class="toggle ms-1" (click)="isOpen = !isOpen"><i [class]="{'icon-up-open': isOpen, 'icon-down-open': !isOpen}"></i></span>

        @if (isOpen) {
            <span class="d-block mt-1 ms-1">
                <ul class="inspection-times pl-3 mb-2">
                    @for(time of times; track time) {
                        <li class="ms-0 mb-1">{{getDateRange(time.openingTime, time.closingTime)}}</li>
                    }
                    @if(auctionSchedule && auctionSchedule.time) {
                    <li class="text-danger ms-0 mb-1"><i class="icon-hammer"></i> {{getShortDateAndTime(auctionSchedule.time)}}</li>
                    }
                </ul>
            </span>
        }
    `,
    styles: `
    ul.inspection-times {
        list-style-type: circle;
        li {
            font-size: 12px;
        }
    }
    `
})
export class ListingInspectionTimesComponent {

    @Input() inspectionSchedule?: InspectionSchedule;
    @Input() auctionSchedule?: AuctionSchedule;

    isOpen: boolean = false;
    times: Time[] = [];
    isAuctionTimeInFuture: boolean = false;

    getShortDateAndTime = getShortDateAndTime;
    getDateRange = getDateRange;

    ngOnInit() {
        this.times = this.inspectionSchedule
            && this.inspectionSchedule.times
            && this.inspectionSchedule.times.length > 0
            ? this.inspectionSchedule.times.filter(x => new Date(x.openingTime) > new Date())
            : [];

        this.isAuctionTimeInFuture = !!this.auctionSchedule
            && !!this.auctionSchedule.time
            && new Date(this.auctionSchedule.time) > new Date();
    }
}
