import { Component, Input } from '@angular/core';
import { DomainListingWithStops } from '../../shared/types/listing';

interface SuburbCount {
    name: string;
    count: number;
}

@Component({
    selector: 'suburb-summary',
    standalone: true,
    imports: [],
    template: `    
    <div>{{ suburbString }}</div>
  `,
    styles: ``
})
export class SuburbSummaryComponent {
    @Input() results: DomainListingWithStops[] = [];
    @Input() filterSuburbs?: string[] = [];

    //suburbCounts: SuburbCount[] = [];
    suburbCounts: Map<string, SuburbCount> = new Map<string, SuburbCount>();

    suburbString: string = '';

    ngOnChanges() {

        let suburbCounts = this.results.reduce((a, c) => {
            const upperCaseSuburb = c.listing.propertyDetails.suburb.toUpperCase();
            if (a.get(upperCaseSuburb)) {
                a.get(upperCaseSuburb)!.count++;
            } else {
                a.set(upperCaseSuburb, { name: this.toTitleCase(c.listing.propertyDetails.suburb), count: 1 });
            }
            return a;
        }, new Map<string, SuburbCount>());

        // Sort suburbs descending
        suburbCounts = new Map<string, SuburbCount>([...suburbCounts.entries()]
            .sort((a, b) => {
                return (b[1].count - a[1].count);
            }));

        // Add empty suburbs from search terms
        if (this.filterSuburbs)
            this.filterSuburbs.filter(s => !suburbCounts.has(s.toUpperCase()))
                .map(s => ({ name: this.toTitleCase(s), count: 0 }) as SuburbCount)
                .forEach(sc => suburbCounts.set(sc.name.toUpperCase(), sc));

        this.suburbString = Array.from(suburbCounts.values()).map(s => `${s.name} (${s.count})`).join(", ");
    }

    toTitleCase(input: string) {
        return input.split(' ')
            .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(' ');
    }
}
