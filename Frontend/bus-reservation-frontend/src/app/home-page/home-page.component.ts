import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatDatepickerModule,CalendarModule,FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  date1: Date | undefined;
}
