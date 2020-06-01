import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  errorText = '';

  loginStatus = false;

  constructor(private loginservice: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }

  onlogin = () => {
    this.loginStatus = true;
    this.errorText = ''
    this.loginservice.login(this.user).subscribe(({ token, userDetails }) => {
      const accesstoken = token.id;
      this.loginStatus = false;
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      localStorage.setItem('accesstoken', accesstoken);
      let page = localStorage.getItem('page')
      let param = localStorage.getItem('param')
      if (page && param) {
        this.router.navigate([page, param])
      } else if (page && !param) {
        this.router.navigate([page])
      } else {
        this.router.navigate(['pages']);
      }
    },(err)=>{
      this.loginStatus = false;
      this.errorText = 'Wrong credentials';
    });
  }

}
