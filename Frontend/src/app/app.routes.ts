import { Routes } from '@angular/router';
import { SearchBusComponent } from './components/search-bus/search-bus.component';
import { SeatsComponent } from './components/seats/seats.component';
import { PassDetailsComponent } from './components/pass-details/pass-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
    {
        path:"",
        component:HomePageComponent
    },
    {
        path:'search',
        component:SearchBusComponent
        
    },
  
    {
        path:'details',
        component:PassDetailsComponent
    },
    {
        path:"payment/:id",
        component:PaymentComponent
    },
    {
        path:'seats/:id',
        component:SeatsComponent
    }
];
