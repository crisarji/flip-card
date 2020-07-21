import { Component, Input } from '@angular/core';

@Component({
  selector: 'fc-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss'],
})
export class RetryComponent {
  @Input() public isUserWinner: boolean;
  @Input() public timeElapsed: number;
}
