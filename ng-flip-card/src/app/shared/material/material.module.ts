import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export { MatRadioChange } from '@angular/material/radio';
export { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
export { ErrorStateMatcher } from '@angular/material/core';

const modules = [
  FlexLayoutModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSnackBarModule,
  MatInputModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule { }
