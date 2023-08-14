import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { toasterClass } from '../toaster/toaster.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginLogout = false;
  constructor(private authService: AuthService,
              private toaster: toasterClass,
              private router: Router) { 
    this.authService.loginValue.subscribe((res: any) => {
      if (localStorage.getItem('isLogin') == 'true' ) {
        this.loginLogout =  true; 
      } else {
      this.loginLogout = res;
      }
    });
  }

  ngOnInit(): void {
  }

  logOut() {
    if(localStorage.getItem('user')){
    let userData: any = JSON.parse(localStorage.getItem('user') || '');
    let data = {
      token: userData.accessToken
    }
    this.authService.logOut(data).subscribe((res: any) => {
      localStorage.removeItem('user');
      localStorage.setItem('isLogin', 'false');
      this.authService.setLoginValue(false);
      this.toaster.showToaster('success', res.data);
      this.router.navigate(['/login']);
    }, error => {
      this.toaster.showToaster('error', error.error.message);
    });
  }
}
}
