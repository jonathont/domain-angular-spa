import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment as env } from '../../../../shared/environment';

@Component({
  selector: 'listing-agent-details',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="w-50 d-inline-block text-center">
        <img loading="lazy" class="agent-photo" [src]="photoUrl ?? placeholder" alt="Agent profile" /><br />
        <span *ngIf="name" class="agent-name">{{name}}</span>
    </div>
  `,
  styles: `
    .agent-photo {
        border-radius: 50%;
        height: 50px;
        width: 50px;
    }
    .agent-name {
        font-size: 10px;
        max-width: 50px;
        word-wrap: break-word;
    }      
  `
})
export class ListingAgentDetailsComponent {

    @Input() name: string = '';
    @Input() photoUrl?: string;
    
    placeholder = env.agentPlaceholder;
}
