import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './search/search/search.component';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SearchComponent, SearchResultsComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
}
