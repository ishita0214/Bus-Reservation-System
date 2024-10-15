import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BusesService } from '../../Services/buses.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SeatServiceService } from '../../Services/seat-service.service';
import { BusService } from '../../Services/bus.service';
import { Bus } from '../../Models/bus';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [CalendarModule, FormsModule, ReactiveFormsModule, CommonModule],
  
})
export class HomePageComponent implements OnInit {
  busForm: FormGroup;
  fromOptions: string[] = []; 
  toOptions: string[] = []; 
  buses:Bus[]=[];
  constructor(private fb: FormBuilder, private busService: BusesService, private seatService:SeatServiceService, private router:Router,private bService:BusService
    
  ) {
    this.busForm = this.fb.group({
      from: [''],
      to: [''],
      date: [null],
    });
  }

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes() {
    this.busService.getRoutes().subscribe({
      next: (routes: any[]) => {
        this.fromOptions = routes.map(route => route.source);
        this.toOptions = routes.map(route => route.destination); 
      },
      error: (error) => {
        console.error('Error fetching routes', error);
      }
    });
  }
  // getBuses() {
  //       if (this.busForm.valid) {
  //         const formValues = this.busForm.value;
  //         console.log('Selected departure city:', formValues.from); 
  //         console.log('Selected destination city:', formValues.to); 
  //         console.log('Selected date:', formValues.date); 
    
  //         // Set the selected route in the service
  //         this.seatService.selectRoute({
  //           from: formValues.from,
  //           to: formValues.to,
  //           date: formValues.date

          
  //         });

  //         this.router.navigate(['/search']);
  //       } else {
  //         console.log('Form is invalid'); 
  //       }
  //     }

  // Helper function to format date as YYYY-MM-DD
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  getBuses() {
    if (this.busForm.valid) {
      const formValues = this.busForm.value;
      console.log('Selected departure city:', formValues.from); 
      console.log('Selected destination city:', formValues.to); 
      
      // Format the date before sending it to the backend
      const formattedDate = this.formatDate(formValues.date);
      console.log('Formatted date:', formattedDate);

      this.bService.getBuses(formValues.from, formValues.to, formattedDate).subscribe({
        next: (data: Bus[]) => {
          this.buses = data;
          console.log('Fetched buses:', this.buses);
          this.router.navigateByUrl('search')
          this.bService.buses$.next(this.buses)
        },
        error: (error) => {
          console.error('Error fetching buses', error);
        }
      });
    } else {
      console.log('Form is invalid'); 
    }
  }
    }
