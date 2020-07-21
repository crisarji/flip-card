import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Authenticate } from '@app/features/authentication/models';

@Component({
  selector: 'fc-login-form',
  templateUrl: `./login-form.component.html`,
  styleUrls: ['./../auth.component.scss'],
})
export class LoginFormComponent {
  @Output() public loginSubmit = new EventEmitter<Authenticate>();
  @Output() public changeToRegister = new EventEmitter<boolean>();

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);
  public loginForm = new FormGroup({
    username: this.emailFormControl,
    password: this.passwordFormControl,
  });

  public login(): void {
    this.loginSubmit.emit({
      email: this.loginForm.value.username.trim(),
      password: this.loginForm.value.password.trim(),
    } as Authenticate);
  }

  public register(): void {
    this.changeToRegister.emit(true);
  }
}
