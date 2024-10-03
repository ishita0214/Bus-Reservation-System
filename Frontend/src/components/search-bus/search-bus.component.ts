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
    // Add more bus objects as needed
  ];

constructor(private busService: SeatServiceService) {}

  selectBus(bus: any) {
    this.busService.selectBus(bus);
    this.route.navigateByUrl('seats');

  }

}
