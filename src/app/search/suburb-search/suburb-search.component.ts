import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs/internal/types';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Option } from '../../shared/data/allSuburbOptions';

@Component({
    selector: 'suburb-search',
    standalone: true,
    imports: [CommonModule, NgbTypeaheadModule, FormsModule],
    template: `
    <div class="suburb-search">
        <input #input
               id="suburb-typeahead"
               type="text" 
               class="form-control"
               placeholder="Start typing a suburb..."               
               multiple
               [ngbTypeahead]="search"
               [editable]="false"
               (selectItem)="selected($event)"
                />

        <p class="selected-suburbs">
            <button  *ngFor="let suburb of suburbs" 
                type="button" class="btn btn-secondary btn-sm rbt-token" (click)="removeSuburb(suburb)">{{suburb}}  <i class="bi bi-x" ></i></button>
        </p>

    </div>
  `,
    styleUrl: './suburb-search.component.scss'
})
export class SuburbSearchComponent {

    @Input() suburbOptions: Option[] = [];
    @Input() state: string = '';
    @Output() suburbsChanged = new EventEmitter<string[]>();
    @ViewChild('input') input!: ElementRef<HTMLInputElement>;

    suburbs: string[] = [];
    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term: string) =>
                term.length < 2 ? [] : this.suburbOptions.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).map(v => v.name).slice(0, 10),
            ),
        );

    selected($e: NgbTypeaheadSelectItemEvent) {
        $e.preventDefault();
        this.suburbs.push($e.item);
        this.input.nativeElement.value = '';
        this.suburbsChanged.emit(this.suburbs);
    }

    removeSuburb(suburb: string) {
        this.suburbs = this.suburbs.filter(s => s !== suburb);
        this.suburbsChanged.emit(this.suburbs);        
    }

}
