import { Routes } from '@angular/router';
import { SearchBusComponent } from '../components/search-bus/search-bus.component';
import { SeatsComponent } from '../components/seats/seats.component';

export const routes: Routes = [
    {
        path:'search',
        component:SearchBusComponent
        
    },
    {
        path:'seats',
        component:SeatsComponent
    }
];
