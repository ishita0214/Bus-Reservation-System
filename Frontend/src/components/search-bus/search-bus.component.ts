import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SeatServiceService } from '../../app/services/seat-service.service';



@Component({
  selector: 'app-search-bus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bus.component.html',
  styleUrl: './search-bus.component.css'
})
export class SearchBusComponent {
  route=inject(Router)
  buses = [
    { id: 1, name: 'Luxury Coach A (LC123)', arrivalTime: '10:00 AM', departureTime: '08:00 AM', duration: '2h', price: 500 },

  ];

constructor(private busService: SeatServiceService) {}
selectedRoute: any;

 
  ngOnInit() {
    this.busService.selectedRoute.subscribe(route => {
      this.selectedRoute = route;
      console.log('Selected route:', this.selectedRoute);
    });
  }

  selectBus(bus: any) {
    this.busService.selectBus(bus);
    this.route.navigateByUrl('seats');
  }



  

}


/*
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeatServiceService } from '../../app/services/seat-service.service';

@Component({
  selector: 'app-search-bus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  route = inject(Router);
  buses = [
    { id: 1, name: 'Luxury Coach A (LC123)', arrivalTime: '10:00 AM', departureTime: '08:00 AM', duration: '2h', price: 500 },
    // Add more bus objects as needed
  ];

  selectedRoute: any;

  constructor(private busService: SeatServiceService) {}

  ngOnInit() {
    this.busService.selectedRoute$.subscribe(route => {
      this.selectedRoute = route;
      console.log('Selected route:', this.selectedRoute);
    });
  }

  selectBus(bus: any) {
    this.busService.selectBus(bus);
    this.route.navigateByUrl('seats');
  }
}

*/