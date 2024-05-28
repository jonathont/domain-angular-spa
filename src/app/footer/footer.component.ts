import { Component, Input } from '@angular/core';

@Component({
    selector: 'footer',
    standalone: true,
    imports: [],
    template: `
        <div id="footer" class="text-center mb-2 p-2">
            <p class="mb-0">
                &copy; 2024 <a target="_blank" href="https://github.com/scottabutler/">Scott Butler</a>. This site uses API data from <a target="_blank" href="https://developer.domain.com.au/docs/introduction">Domain</a> and is subject to their <a href="https://developer.domain.com.au/docs/support/terms">terms of use</a>.
            </p>
            <p class="mb-0">
                Agency logos and colours are supplied by Domain and remain the property of their respective agency.
            </p>
            <p class="mb-2">
                Your search filters and hidden properties are saved in local storage and do not leave your browser.
            </p>
            <p class="mb-0">
                Icons provided by <a target="_blank" href="https://fontawesome.com/">FontAwesome</a>.
            </p>
            <p class="mb-2">
                Suburb list provided by <a target="_blank" href="https://github.com/michalsn/australian-suburbs">michalsn/australian-suburbs</a>.
            </p>
            <p class="mb-0">
                {{metadata}}
            </p>
        </div>
  `,
    styles: ``
})
export class FooterComponent {
    @Input() metadata: string = '';
}
