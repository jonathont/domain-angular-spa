import { Component, Input } from '@angular/core';

@Component({
  selector: 'simple-carousel',
  standalone: true,
  imports: [],
  template: `
        <div class="wrapper">
            <img src={{urls[getPrevIndex()]}} [style]="{'display': 'none'}" alt="Previous carousel" />
            <img src={{urls[getNextIndex()]}} [style]="{'display': 'none'}" alt="Next carousel" />
            <div class="img" [style]="urls[index] && {'backgroundImage': 'url(' + urls[index] + ')'}" [title]="altText"> </div>
            <div class="dots">
                <span>
                    @for (u of urls; track u; let i = $index) {
                    <i [class]="{'icon-circle': i === index, 'icon-circle-empty': i != index}"></i>                    
                    }
                </span>
            </div>
            
            @if (urls.length > 1) {
                <button class="back-button" (click)="goPrev()">
                    <i class="icon-left-open"></i>
                </button>
                <button class="next-button" (click)="goNext()">
                    <i class="icon-right-open"></i>
                </button>
            }
        </div>
  `,
  styleUrl: './simple-carousel.component.scss'
})
export class SimpleCarouselComponent {

    @Input() urls: string[] = [];
    @Input() altText: string = '';

    index: number = 0;
    count: number = 0;
  
    ngOnInit() {
        this.count = this.urls.length;
    }

    getNextIndex(): number {
        return this.index === this.count - 1 ? 0 : this.index + 1;
    }

    getPrevIndex(): number {
        return this.index === 0 ? this.count - 1 : this.index - 1;
    }    

    goNext() {
        this.index = this.getNextIndex();
    }

    goPrev() {
        this.index = this.getPrevIndex(); 
    }
}
