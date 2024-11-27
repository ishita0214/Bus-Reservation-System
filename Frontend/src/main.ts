import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './app/auth.interceptor'; // Adjust path as necessary
import { AuthService } from './app/Services/auth.service';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, appConfig
 
)
.catch((err) => console.error(err));