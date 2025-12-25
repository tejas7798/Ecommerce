import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-page',
  standalone :true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',  
})
export class LoginPage {
  // loginFormGroup = new FormControl("LoginPage");
  email :any= "";
  private apiUrl = environment.userLogin;
  constructor(private http: HttpClient , private router: Router) {}

  loginFormGroup = new FormGroup({
    email: new FormControl('email'),
    password: new FormControl('password')
  })

  getUserByEmailId(body:{}) {
    return this.http.post(this.apiUrl,body);
  }

  onSubmit(){
    console.log(this.loginFormGroup.value.email);
    // alert(this.loginFormGroup.value.email)
    const body = {
      email : this.loginFormGroup.value.email,
      password : this.loginFormGroup.value.password
    }
    this.getUserByEmailId(body).subscribe({
      next: (res:any) => {
        if(res.status === 200){
          localStorage.setItem("username",res.username);
          this.router.navigate(['/products']); 
        }else{
          this.router.navigate(['/login']); 
        }
      },
      error: (err:any) => {
        console.error('Error fetching products:', err);
      }
    });  
  }
}
