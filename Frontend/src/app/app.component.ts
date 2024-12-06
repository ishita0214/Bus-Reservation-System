import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  title = 'Frontend';
  isModalOpen: boolean = false;
  isLogin: boolean = true;
  isLoggingIn: boolean = true;



  currUser: User | null = null;

  constructor(private userService: UserService, private route: Router, public authService: AuthService, private cdRef: ChangeDetectorRef) { }
  ngOnInit(): void {
    const userId = localStorage.getItem('loginUser');

    this.getCurrUser();
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggingIn = loggedIn;
      if (userId) {
        this.isLoggingIn = true;
        console.log(this.isLoggingIn);

      } else {
        this.isLoggingIn = false;
      }
      if (loggedIn) {
        this.getCurrUser(); // Fetch the user when logged in
      }
      else {
        this.currUser = null;
        this.userService.setCurrentUser(null); // Reset current user on logout
      }
    });

    // Subscribe to user data updates from UserService
    this.userService.user$.subscribe((user) => {
      this.currUser = user;  // Update currUser with the latest user data
      this.cdRef.detectChanges();  // Ensure the change is detected
    });
  }




  User: any = {
    name: '',
    password: ''
  }
  signUpForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    phone: new FormControl(''),
    age: new FormControl(null),
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
  logout() {
    this.authService.logout();
    this.userService.setCurrentUser(null);
    this.route.navigateByUrl('/home');
    this.isLoggingIn = false;
  }

  signup() {
    this.authService.signup(this.signUpForm.value).subscribe(() => {
      alert('Signup successful! Please log in.');
      this.toggleToLogin();
    });
    this.isModalOpen = false;
  }



  getCurrUser(): void {
    const userId = localStorage.getItem('loginUser');

    console.log(userId);

    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe(
        (data) => {
          this.userService.setCurrentUser(data); // Update application state
          this.currUser = data; // Update component state
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.logout(); // Log out if the user cannot be fetched (e.g., invalid token)
        }
      );
    }
  }

}

