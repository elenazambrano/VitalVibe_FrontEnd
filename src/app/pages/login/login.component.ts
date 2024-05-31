import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm: FormGroup;
  user = undefined;
  invalid = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ){
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(){
    this.sessionService.getUser().subscribe(res =>{
      this.user=res;
    })
    console.log(this.user);
    if(this.user){
      this.router.navigate(["/home"]);
    }
  }

  onSubmit(){
    if(this.myForm.valid){
      this.userService.login(this.myForm.value).subscribe(res=>{
        this.sessionService.setUser(res)
        this.router.navigate(['/home']);
      },
    (err)=>{
      this.invalid=true;
    });
    }else {
      this.myForm.markAllAsTouched()
    }
  }
}
