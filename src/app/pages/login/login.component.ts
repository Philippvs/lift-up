import { Component } from '@angular/core';


import { inject } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {AuthService, LoginData} from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);


  protected loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  login() {
    console.log(this.loginForm);
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login({email: this.loginForm.value.email, password: this.loginForm.value.password} as LoginData)
          .subscribe((data: any) => {
            if(this.authService.isLoggedIn()){
              this.router.navigate(['/admin']);
            }
            console.log(data);
          });
    }
  }

}
