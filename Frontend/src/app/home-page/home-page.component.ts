import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BusesService } from '../Services/buses.service';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private busService: BusesService) {
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

  getBuses() {
    if (this.busForm.valid) {
      const formValues = this.busForm.value;
      console.log('Selected departure city:', formValues.from); 
      console.log('Selected destination city:', formValues.to); 
      console.log('Selected date:', formValues.date); 
    } else {
      console.log('Form is invalid'); 
    }
  }
}

