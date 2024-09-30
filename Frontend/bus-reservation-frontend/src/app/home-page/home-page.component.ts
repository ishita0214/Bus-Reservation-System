import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CalendarModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  date1: Date | undefined;

}
