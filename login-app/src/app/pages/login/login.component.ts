import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService]
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService

  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit(){
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      {
        next:() => console.log("Login successful"),
        error: (error) => console.log("Error: ", error)
      }
    );
  }
  navigate(){
    this.router.navigate(["/signup"]);
  }
}
