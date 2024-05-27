import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './search/search/search.component';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search/search-results/search-results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SearchComponent, SearchResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'domain-angular-spa';
}
