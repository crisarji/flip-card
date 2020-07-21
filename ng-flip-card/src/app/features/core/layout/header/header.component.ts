import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '@app/features/authentication/models';

@Component({
  selector: 'fc-header',
  templateUrl: `./header.component.html`,
})
export class HeaderComponent {
  @Input() public user: User;
  @Output() public signOut = new EventEmitter<void>();

  public logOut(): void {
    this.signOut.emit();
  }
}
