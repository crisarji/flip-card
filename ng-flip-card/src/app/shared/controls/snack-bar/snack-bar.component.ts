import { Component } from '@angular/core';
import { MatSnackBar } from '@app/shared/material/material.module';

@Component({
  selector: 'sc-snack-bar',
  template: '',
})
export class SnackBarComponent {
  constructor(public snackBar: MatSnackBar) { }

  // this function will open up snackbar on top right position with custom background color (defined in css)
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [className],
    });
  }
}
