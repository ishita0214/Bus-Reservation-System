import { Routes } from '@angular/router';
import { SearchBusComponent } from './Components/search-bus/search-bus.component';
import { SeatsComponent } from './Components/seats/seats.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { TicketComponent } from './Components/ticket/ticket.component';
import { BookingsComponent } from './Components/bookings/bookings.component';
import { BookingDetailsComponent } from './Components/booking-details/booking-details.component';

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
        path:"payment/:id",
        component:PaymentComponent
    },
    {
        path:'seats/:id',
        component:SeatsComponent
    },

    {
        path:'ticket',
        component:TicketComponent
    },
    {
        path:'bookings',
        component:BookingsComponent
    },
    {
        path:'details/:bookingId',
        component:BookingDetailsComponent
    },

];
