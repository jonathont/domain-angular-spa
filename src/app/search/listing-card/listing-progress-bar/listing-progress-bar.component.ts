import { Component, Input } from '@angular/core';

@Component({
    selector: 'listing-progress-bar',
    standalone: true,
    imports: [],
    template: `
    <div class="progress" style="height: 2px">
            <div
                class="progress-bar"
                role="progressbar"
                [style]="{'width': progress + '%'}"
                aria-valuenow={progress}
                aria-valuemin={min}
                aria-valuemax={max}
            >
            </div>
        </div>
  `,
    styles: ``
})
export class ListingProgressBarComponent {

    @Input() dateListed: string = '';
    @Input() auctionScheduleTime?: string = '';

    progress: number = 0;

    ngOnInit() {
        if (this.dateListed == '' || this.dateListed == null || this.auctionScheduleTime == '' || this.auctionScheduleTime == null)
            return;

        const msToDaysMultiplier = 1000 * 60 * 60 * 24;

        const dateListedDays = Math.round(new Date(this.dateListed).getTime() / msToDaysMultiplier);
        const auctionDateDays = this.auctionScheduleTime ? Math.round(new Date(this.auctionScheduleTime).getTime() / msToDaysMultiplier) : 0;
        const nowDays = Math.round(new Date().getTime() / msToDaysMultiplier);

        this.progress = Math.round((auctionDateDays > 0 ? ((nowDays - dateListedDays) / (auctionDateDays - dateListedDays)) : 0) * 100);
    }

}
