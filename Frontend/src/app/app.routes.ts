import { Routes } from '@angular/router';
import { SearchBusComponent } from '../components/search-bus/search-bus.component';
import { SeatsComponent } from '../components/seats/seats.component';
import { HomePageComponent } from './home-page/home-page.component';

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
        path:'seats',
        component:SeatsComponent
    }
];
