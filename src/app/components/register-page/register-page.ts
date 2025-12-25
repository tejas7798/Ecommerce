import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {
  
  constructor(private http: HttpClient , private router: Router) {}
  
  private apiUrl = environment.userRegister;
  registerData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  getUserByEmailId(body:{}) {
    return this.http.post(this.apiUrl,body);
  }

  onRegister(){
    console.log(this.registerData.email);
    // alert(this.loginFormGroup.value.email)
    const body = {
      email : this.registerData.email,
      password : this.registerData.password
    }
    this.getUserByEmailId(body).subscribe({
      next: (res:any) => {
        if(res.status === 200){
          console.log("Registration Successful",res);
          localStorage.setItem("username",this.registerData.username);
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
