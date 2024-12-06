import { Routes } from '@angular/router';
import { SearchBusComponent } from './Components/search-bus/search-bus.component';
import { SeatsComponent } from './Components/seats/seats.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { TicketComponent } from './Components/ticket/ticket.component';
import { BookingsComponent } from './Components/bookings/bookings.component';
import { BookingDetailsComponent } from './Components/booking-details/booking-details.component';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    
    {
        path:'home',
        component:HomePageComponent
    },
    {
        path:'search' ,
        component:SearchBusComponent
        
    },
    {
        path:"payment/:id",canActivate:[AuthGuard] ,
        component:PaymentComponent
    },
    {
        path:'seats/:id',canActivate:[AuthGuard] ,
        component:SeatsComponent
    },

    {
        path:'ticket/:bookingId',canActivate:[AuthGuard] ,
        component:TicketComponent
    },
    {
        path:'bookings',canActivate:[AuthGuard] ,
        component:BookingsComponent
    },
    {
        path:'details/:bookingId',canActivate:[AuthGuard] ,
        component:BookingDetailsComponent
    },

];
