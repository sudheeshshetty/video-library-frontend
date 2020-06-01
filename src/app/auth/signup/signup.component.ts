import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../helper/mustmatch';
import { SingupService } from './singup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  signupStatus = false;
  errorText = '';

  constructor(private formBuilder: FormBuilder,
    private signupService: SingupService,
    private router: Router) { }

  ngOnInit(): void {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorText = ''
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    var data = { ...this.registerForm.value }
    delete data.confirmPassword
    this.signupService.signUp(data).subscribe((data) => {
      this.submitted = false;
      this.router.navigate(['/auth/login']);
    },
      (err) => {
        console.log(err)
        if (err.status == 422) {
          this.submitted = false;
          this.errorText = 'Duplicate Email'
        }
      })
  }

}
