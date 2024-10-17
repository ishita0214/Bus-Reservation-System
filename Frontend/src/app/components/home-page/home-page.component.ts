import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SeatServiceService } from '../../Services/seat-service.service';
import { BusService } from '../../Services/bus.service';
import { Bus } from '../../Models/bus';
import { RouteService } from '../../Services/route.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [CalendarModule, FormsModule, ReactiveFormsModule, CommonModule,DropdownModule],
})
export class HomePageComponent implements OnInit {
  busForm: FormGroup;
  source: string[] = [];
  destination: string[] = [];
  buses: Bus[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private busService: BusService,
    private routeService: RouteService
  ) {
    this.busForm = this.fb.group({
      source: [null],
      destination: [null],
      date: [null],
    });
  }

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes() {
    this.routeService.getAllRoutes().subscribe({
      next: (routes: any[]) => {
        this.source = routes.map((route) => route.source);
        this.destination = routes.map((route) => route.destination);
      },
      error: (error) => {
        console.error('Error fetching routes', error);
      },
    });
  }
 
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getBuses() {
    if (this.busForm.valid) {
      const formValues = this.busForm.value;
      console.log('Selected departure city:', formValues.source);
      console.log('Selected destination city:', formValues.destination);

      // Format the date before sending it to the backend
      const formattedDate = this.formatDate(formValues.date);
      console.log('Formatted date:', formattedDate);

      this.busService
        .getBuses(formValues.source, formValues.destination, formattedDate)
        .subscribe({
          next: (data: Bus[]) => {
            this.buses = data;
            console.log('Fetched buses:', this.buses);
            this.router.navigateByUrl('search');
            this.busService.buses$.next(this.buses);
          },
          error: (error) => {
            console.error('Error fetching buses', error);
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
