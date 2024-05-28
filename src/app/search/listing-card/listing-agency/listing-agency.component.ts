import { Component, Input } from '@angular/core';
import { Contact } from '../../../shared/types/listing';
import { environment as env } from '../../../shared/environment';
import { ListingAgentDetailsComponent } from './listing-agent-details/listing-agent-details.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'listing-agency',
  standalone: true,
  imports: [NgIf, ListingAgentDetailsComponent],
  template: `
	<div class="agency-details px-3"
		[class]="{'open': isOpen, 'closed': !isOpen}"
		[style]="{'backgroundColor': agentBackgroundColour, 'color': agentTextColour}">

		<span class="toggle me-2" (click)="isOpen = !isOpen"><i [class]="{'icon-up-open': isOpen, 'icon-down-open': !isOpen}"></i></span>

		<span *ngIf="!logoUrl" class="agency-name">{{name}}</span>
				
		<img *ngIf="logoUrl" class="agency-logo" [src]="logoUrl" alt="Agency logo" />
		
		@if (!isOpen && contacts && contacts[0] && contacts[0].photoUrl) {
		<img loading="lazy" class="agent-photo" 
			[style]="{'border': '3px solid' + agentBackgroundColour}" 
			[src]="contacts[0].photoUrl || agentPlaceholder" 
			alt="Primary agent" />
		}

		@if (isOpen) {
			@if (contacts) {
				<div class="py-3">
					@if (contacts[0]) {
					<listing-agent-details [name]="contacts[0].name" [photoUrl]="contacts[0].photoUrl" />
					}
					@if (contacts[1]) {
					<listing-agent-details [name]="contacts[1].name "[photoUrl]="contacts[1].photoUrl" />
					}
				</div>
			}
			<div class="info mb-2">
				<span>{{name}}</span>
			</div>
		}
	</div>
  `,
  styleUrl: './listing-agency.component.scss'
})
export class ListingAgencyComponent {

    @Input() name?: string = '';
    @Input() logoUrl?: string;
    @Input() preferredColourHex: string = '';
    @Input() contacts?: Contact[];

	agentBackgroundColour: string = '';
	agentTextColour: string = '';
	agentPlaceholder: string = env.agentPlaceholder;

	isOpen: boolean = false;

	ngOnInit() {
		this.agentBackgroundColour = this.preferredColourHex;
		this.agentTextColour = this.calculateTextColourForBackgroundColour(this.hexToRgb(this.agentBackgroundColour));		
	}

	private hexToRgb(hex: string): number[] {
		const withoutHash = hex.replaceAll('#', '');
		const parts = withoutHash.length === 3
			? [ withoutHash[0] + withoutHash[0], withoutHash[1] + withoutHash[1], withoutHash[2] + withoutHash[2] ]
			: [ withoutHash.substr(0, 2), withoutHash.substr(2, 2), withoutHash.substr(4, 2) ];
		return parts.map((x) => parseInt(`0x${x}`, 16));
	}
	
	// https://stackoverflow.com/a/3943023
	private calculateTextColourForBackgroundColour(rgb: number[]): string {
		return (rgb[0]*0.299 + rgb[1]*0.587 + rgb[2]*0.114) > 186
			? "#000000"
			: "#ffffff";
	}

}
