import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordconfirm: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid && this.passwordMatch()) {

      this.userService.register(this.myForm.value).subscribe(res => {
        if(res){
          this.router.navigate(["/login"]);
        }
      });
      return true;
    } else {
      this.myForm.markAllAsTouched()
    }
    
    return false;
    
  }

  passwordMatch(): Boolean{
    return this.myForm.get('password')?.value === this.myForm.get('passwordconfirm')?.value
  }

}
