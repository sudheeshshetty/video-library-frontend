import { Component, OnInit } from '@angular/core';

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

  loginStatus = false;

  constructor() { }

  ngOnInit(): void {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }

  onlogin = () => {
    this.loginStatus = true;
    // this.loginservice.login(this.user).subscribe(({ token, userDetails }) => {
    //   const accesstoken = token.id;
    //   localStorage.setItem('userDetails', JSON.stringify(userDetails));
    //   localStorage.setItem('accesstoken', accesstoken);
    //   this.router.navigate(['pages']);
    // });
  }

}
