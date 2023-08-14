import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { toasterClass } from '../toaster/toaster.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private toaster: toasterClass,
              private router: Router,
              ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/dashboard']);
    }
  }

  resetForm() {
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((result: any) => {
      if(result && result.data) {
        localStorage.setItem('user', JSON.stringify(result.data));
        this.toaster.showToaster('success', result.message);
        this.authService.setLoginValue(true);
        this.router.navigate(['/dashboard']);
      }
    }, error => {
      this.toaster.showToaster('error', error.error.message);
    });

  }
}
