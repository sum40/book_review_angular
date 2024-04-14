import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../login.service';
import { LoginInterface, LoginResponse } from '../login-interface';
import { routes } from '../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(
    private route: Router,
    // private http: HttpClient,
    private loginService: LoginService
  ) {}
  formbuild = inject(FormBuilder);

  loginForm: FormGroup = this.formbuild.group({
    email: '',
    password: '',
  });
  loginResponse: LoginResponse = {};
  login() {
    const login: LoginInterface = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    console.log(login);
    this.loginService.authUser(login).subscribe(async (res) => {
      this.loginResponse = res;
      localStorage.setItem('token', this.loginResponse.token ?? '');
      if (this.loginResponse.success) {
        this.route.navigateByUrl('/home');
      } else {
        alert('Invalide User-Name or Password');
      }
    });
  }
}
