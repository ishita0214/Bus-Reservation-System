import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SearchBusComponent } from "./components/search-bus/search-bus.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './Services/user.service';
import { User } from './Models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchBusComponent,CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Frontend';
  isModalOpen: boolean = false; // Modal visibility state
  isLogin: boolean = true; // Toggle between login and signup
  userID:any=localStorage.getItem('loginUser')
  currUser: User | null = null; // Initialize as null
    constructor(private userService:UserService,private route:Router){}
  ngOnInit(): void {  
    this.getCurrUser();
  }
  User:any={
    name:'',
    password:''
  }
  signUpForm:FormGroup=new FormGroup({
    name:new FormControl(''),
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
  }

  toggleToSignup() {
    this.isLogin = false; // Switch to signup form
  }

  toggleToLogin() {
    this.isLogin = true; // Switch back to login form
  }

  onLogin() {
    console.log(this.User.name);
    
    // Handle login logic here
    console.log('Logging in...');
    this.userService.findUserByName(this.User.name).subscribe({
      next: (data) => {
        if (data) {
          if (data.password === this.User.password) {
            localStorage.setItem('loginUser', data.id.toString());
            this.currUser = data; // Update current user immediately
            this.userID = data.id; // Update userID to reflect logged-in state
            this.closeModal(); // Close modal after login
          } else {
            alert("Invalid password");
          }
        } else {
          alert("User doesn't exist. Please signup.");
        }
      },
      error: (err) => {
        alert("Error fetching user data");
      }
    });
}

  onSignUp() {
    // Handle signup logic here
    console.log('Signing up...');
    console.log(this.signUpForm.value);
    this.userService.addUser(this.signUpForm.value).subscribe((data)=>{
      console.log(data);
      
    });
    
    
    this.closeModal(); // Close modal after signup
  }
  logout() {
    localStorage.removeItem('loginUser');
    this.currUser = null; // Clear current user immediately
    this.userID = null; // Clear userID to reflect logged-out state
    this.route.navigateByUrl(''); // Navigate to home or desired route
}
  getCurrUser(){
    console.log(this.userID);
    
    this.userService.getUserById(this.userID).subscribe((data)=>{
      this.currUser=data;
    })
    console.log(this.currUser);
    
  }

}

