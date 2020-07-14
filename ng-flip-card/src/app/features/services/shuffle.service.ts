import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import cardList from '@app/mockdata/json/card-list.json';
import { Card } from '@app/features/core/models/card.model';

@Injectable({
  providedIn: 'root',
})
export class ShuffleService {
  private shuffleBS$: BehaviorSubject<Card[]> = new BehaviorSubject(null);

  public getShuffleDeck(): Observable<Card[]> {
      return this.shuffleBS$.asObservable();
  }

  public setShuffleDeck(cardsTotal: number): void {
    const cardFilter = cardList.filter((item,index) => index < cardsTotal/2)
    const cardListShuffle = [...cardFilter, ...cardFilter].map((item,index) => ({...item, position: index}));
    this.shuffleBS$.next(cardListShuffle.sort( () => Math.random() - 0.5) );
  }
}
