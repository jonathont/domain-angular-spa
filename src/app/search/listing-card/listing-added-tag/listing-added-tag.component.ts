import { Component, Input } from '@angular/core';
import { getHourDifference, getRelativeShortDate, isToday } from '../../../shared/utilities/dateTimeHelper';
import { NgIf } from '@angular/common';

@Component({
    selector: 'listing-added-tag',
    standalone: true,
    imports: [NgIf],
    template: `
    <span *ngIf="addedTagText !== ''" class="added-date">{{addedTagText}}</span>
  `,
    styles: `
    .added-date {
        position: absolute;
        top: 8px;
        left: 8px;
        background-color: rgb(0, 190, 179);
        color: white;
        font-size: 10px;
        font-weight: bold;
        border-radius: 5px;
        padding: 1px 4px;
    }
  `
})
export class ListingAddedTagComponent {

    @Input() dateListed: string = '';

    addedTagText: string = '';
    
    ngOnInit() {
        this.addedTagText = this.getAddedTagText(this.dateListed);
    }

    getAddedTagText (dateListed: string): string {
        const now = new Date();
        const listingDate = new Date(dateListed);
        const addedHoursAgo = getHourDifference(now, listingDate);
        const addedDaysAgo = Math.floor(addedHoursAgo / 24);

        if (addedHoursAgo < 1) return "ADDED JUST NOW";

        if (addedHoursAgo < 2) return "ADDED 1 HOUR AGO";

        if (isToday(listingDate)) return `ADDED ${addedHoursAgo} HOURS AGO`;

        if (addedDaysAgo < 2) return "ADDED YESTERDAY";

        if (addedDaysAgo < 8) return `ADDED ${addedDaysAgo} DAYS AGO`;

        if (addedDaysAgo < 15) return `ADDED LAST WEEK`;

        const includeYear = listingDate.getFullYear() < now.getFullYear();
        return `ADDED ${getRelativeShortDate(dateListed, false, includeYear).toUpperCase()}`;
    }


}
