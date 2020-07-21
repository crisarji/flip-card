import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Authenticate } from '@app/features/authentication/models';

@Component({
  selector: 'fc-register-form',
  templateUrl: `./register-form.component.html`,
  styleUrls: ['./../auth.component.scss'],
})
export class RegisterFormComponent {
  @Output() public registerSubmit = new EventEmitter<Authenticate>();
  @Output() public cancelRegister = new EventEmitter<boolean>();

  public userIdFormControl = new FormControl('', [Validators.required]);
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', [Validators.required]);
  public registerForm = new FormGroup({
    userId: this.userIdFormControl,
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  public register(): void {
    this.registerSubmit.emit({
      nickName: this.registerForm.value.userId.trim(),
      email: this.registerForm.value.email.trim(),
      password: this.registerForm.value.password.trim(),
    } as Authenticate);
  }

  public cancel(): void {
    this.cancelRegister.emit(true);
  }
}
