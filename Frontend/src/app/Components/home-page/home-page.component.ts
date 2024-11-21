import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SeatServiceService } from '../../Services/seat-service.service';
import { BusService } from '../../Services/bus.service';
import { Bus } from '../../Models/bus';
import { RouteService } from '../../Services/route.service';
import { DropdownModule } from 'primeng/dropdown';
import { TicketService } from '../../Services/ticket.service';

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
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private busService: BusService,
    private routeService: RouteService,
    private seatService: SeatServiceService,
    private ticketService: TicketService
  ) {
    this.minDate = new Date();
    this.busForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRoutes();
    this.initializeForm();
  }


  initializeForm() {
    this.busForm = this.fb.group({
      source: ['Select your departure city', Validators.required],         
      destination: ['Select your arrival city', Validators.required],  
      date: ['', Validators.required],           
    });
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

  private formatDate(date: Date | null): string {
    if (!date) return ''; 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`; 
  }
  
  getBuses() {
    if (this.busForm.valid) {
      const formValues = this.busForm.value;    
      console.log("Selected source",formValues.source);
      console.log("Selected destination", formValues.destination);
      //Sending source and destination to ticket service
      this.ticketService.setRouteData(this.busForm.value);

      const formattedDate = this.formatDate(formValues.date);
      this.seatService.date.next(formattedDate);

      this.busService
        .getBuses(formValues.source, formValues.destination, formattedDate)
        .subscribe({
          next: (data: Bus[]) => {
            this.buses = data;
            console.log('Fetched buses:', this.buses);
            this.router.navigateByUrl('search');
            this.busService.buses$.next(this.buses);
            this.seatService.date.next(formattedDate);
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