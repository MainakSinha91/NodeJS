import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../services/shared.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
    loading = false;
    submitted = false;
    username = '';
    password = '';
    wrongCreds = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
    this.username =   this.loginForm.controls.username.value;
    this.password =   this.loginForm.controls.password.value;
  }
  onSubmit() {
    this.submitted = true;
    this.wrongCreds = false;

    this.username =   this.loginForm.controls.username.value;
    this.password =   this.loginForm.controls.password.value;

    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.username, this.password)
        .subscribe(
            data => {
               this.sharedService.setToken(data.token);
              this.router.navigate(['/messages']);
            },
            error => {
                this.loading = false;
                this.wrongCreds = true;
                setTimeout(()=>{
                  this.wrongCreds = false;
                },5000)
            });
}

}
