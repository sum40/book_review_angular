import { Component, inject } from '@angular/core';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupInterface } from '../signup-interface';
import { SignupService } from '../signup.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    MatFormFieldModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(
    private route: Router,

    private SignupService: SignupService
  ) {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  formbuild = inject(FormBuilder);

  signupForm: FormGroup = this.formbuild.group({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  register() {
    const user: SignupInterface = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };
    console.log(user);
    this.SignupService.onSubmit(user).subscribe((res) => {
      this.route.navigateByUrl('/');
    });
  }
}
