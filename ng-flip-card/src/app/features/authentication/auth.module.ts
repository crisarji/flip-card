import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@app/shared/shared.module';
import { AuthComponent } from '@app/features/authentication/auth.component';
import { FirebaseModule } from '@app/features/core/firebase/firebase.module';
import { AuthRoutingModule } from '@app/features/authentication/auth-routing.module';
import { AuthStoreModule } from '@app/features/authentication/state/auth-store.module';
import { LogInFormModule } from '@app/features/authentication/login-form/login-form.module';
import { RegisterFormModule } from '@app/features/authentication/register-form/register-form.module';

const modules = [
  CommonModule,
  AuthRoutingModule,
  RouterModule,
  HttpClientModule,
  SharedModule,
  ReactiveFormsModule,
  AuthStoreModule,
  FirebaseModule.forRoot(),
  LogInFormModule,
  RegisterFormModule,
];

@NgModule({
  imports: [...modules],
  declarations: [AuthComponent],
})
export class AuthModule {}
