import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './Services/user.service';
import { User } from './Models/user';
import { AuthService } from './Services/auth.service';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit{
  title = 'Frontend';
  isModalOpen: boolean = false; 
  isLogin: boolean = true; 
  isLoggingIn: boolean = true; 
  userIDString:any=localStorage.getItem('loginUser');
  

  currUser: User | null = null; 
  userID = Number(this.userIDString)
    constructor(private userService:UserService,private route:Router,public authService:AuthService){}
    ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe((loggedIn) => {
        this.isLoggingIn=loggedIn
        if (loggedIn) {
          const userId = localStorage.getItem('loginUser');
          if (userId) {
            this.getCurrUser();
          }
        } else {
          this.currUser = null;
        }
      });
   
    }
    

  
  User:any={
    name:'',
    password:''
  }
  signUpForm:FormGroup=new FormGroup({
    fullName:new FormControl(''),
    password:new FormControl(''),
    email:new FormControl(''),
    gender:new FormControl(''),
    phone:new FormControl(''),
    age:new FormControl(null),
  })

  openModal() {
    this.isModalOpen = true; // Open the modal
  }

  closeModal() {
    this.isModalOpen = false; // Close the modal
    this.toggleToLogin()
    this.signUpForm.reset()
  }

  toggleToSignup() {
    this.isLogin = false; // Switch to signup form
    
  }

  toggleToLogin() {
    this.isLogin = true; // Switch back to login form
    this.signUpForm.reset

  }
  login() {
    this.authService.login({ email: this.User.name, password: this.User.password });
  
    this.isModalOpen = false;
    this.getCurrUser() 
  }
  logout(){
    this.authService.logout();
    this.route.navigateByUrl('/home');

  }
  
  signup() {
    this.authService.signup(this.signUpForm.value).subscribe(() => {
      alert('Signup successful! Please log in.');
      this.toggleToLogin();
    });
    this.isModalOpen = false; 
  }
  

 
  getCurrUser(){
    console.log(this.userID);
    
    this.userService.getUserById(this.userID).subscribe((data)=>{
      this.currUser=data;
    })
    console.log(this.currUser);
    
  }

}

