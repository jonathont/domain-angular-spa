import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'numeric-search-field',
    standalone: true,
    imports: [],
    template: `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-12 numeric-search-field mb-2 px-3">
        <div class="align-bottom controls mt-2 px-0">
            <button class="down bg-light text-dark p-1 border border-secondary rounded-start d-inline-block" (click)="decrement()">-</button>
            <span class="value px-2 py-1 border-top border-bottom border-secondary d-inline-block"><i [class]="icon" class="float-start"></i>{{ prefix }}{{ defaultValue.toLocaleString() }}{{ suffix }}</span>
            <button class="up bg-light text-dark p-1 border border-secondary rounded-end d-inline-block"  (click)="increment()">+</button>
        </div>
    </div>
    `,
    styles: `
        .numeric-search-field {
            width: 100%;

            .controls {
                max-width: 250px;
            }

            .value {
                min-width: 60%;
                text-align: center;
            }
            .down,
            .up {
                min-width: 20%;
                text-align: center;
                cursor: pointer;
            }
        }
    `
})
export class NumericSearchFieldComponent {
    //const { defaultValue, updateHandler, interval, icon, type, suffix } = props;

    @Input() defaultValue: number = 0;
    @Input() interval: number = 1;
    @Input() icon: string = '';
    @Input() type: string = '';
    @Input() prefix: string = '';
    @Input() suffix: string = '';
    @Input() updateHandler: (i: number) => void = () => { };

    @Output() defaultValueChange = new EventEmitter<number>();

    decrement() {
        if (this.defaultValue - this.interval >= 0) {
            this.defaultValueChange.emit(this.defaultValue - this.interval);
            //this.updateHandler(this.defaultValue - this.interval);
        }
    }

    increment() {
        //this.updateHandler(this.defaultValue + this.interval);
        this.defaultValueChange.emit(this.defaultValue + this.interval);
    }

}
