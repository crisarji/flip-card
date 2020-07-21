import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Card } from '@app/features/core/models/card.model';

@Component({
  selector: 'fc-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  @Input() public deck: Card[];
  @Output() public cardToHide = new EventEmitter<Card>();

  public cardHide = (card: Card) => this.cardToHide.emit(card);
}
