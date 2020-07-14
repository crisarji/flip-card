import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Card } from '@app/features/core/models/card.model';
import { flipStateAnimation } from '@app/features/core/animations/ng-animations';

@Component({
  selector: 'fc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [...flipStateAnimation]
})
export class CardComponent {
  @Input() public card: Card;
  @Output() public cardToHide = new EventEmitter<Card>();

  public flip = 'inactive';

  public toggleFlip(): void {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    setTimeout(() => { this.flip = 'inactive';}, 1200);
  }

  public invokeCardToHide = () => this.cardToHide.emit(this.card);
}