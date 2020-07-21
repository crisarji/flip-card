import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@app/shared/shared.module';
import { RegisterFormComponent } from './register-form.component';

const modules = [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule, MaterialModule];

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [modules],
  exports: [RegisterFormComponent],
})
export class RegisterFormModule { }
