import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeatServiceService } from '../../app/services/seat-service.service';
interface Seat {
  number: number;
  booked: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.css'
})
  


export class SeatsComponent implements OnInit {
  busName = 'Luxury Coach A';
  source = 'City A';
  destination = 'City B';
  departureTime = '08:00 AM';
  arrivalTime = '10:00 AM';
  pricePerSeat = 50; // Example price per seat

  seats: Seat[] = [
    { number: 1, booked: false, selected: false }, { number: 2, booked: true, selected: false }, { number: 3, booked: false, selected: false },
    { number: 4, booked: true, selected: false }, { number: 5, booked: false, selected: false }, { number: 6, booked: false, selected: false },
    { number: 7, booked: true, selected: false }, { number: 8, booked: false, selected: false }, { number: 9, booked: true, selected: false },
    { number: 10, booked: false, selected: false }, { number: 11, booked: false, selected: false }, { number: 12, booked: false, selected: false },
    { number: 13, booked: false, selected: false }, { number: 14, booked: false, selected: false }, { number: 15, booked: true, selected: false },
    { number: 16, booked: false, selected: false }, { number: 17, booked: true, selected: false }, { number: 18, booked: false, selected: false },
    { number: 19, booked: false, selected: false }, { number: 20, booked: true, selected: false }, { number: 21, booked: false, selected: false },
    { number: 22, booked: false, selected: false }, { number: 23, booked: true, selected: false }, { number: 24, booked: false, selected: false },
    { number: 25, booked: false, selected: false }, { number: 26, booked: false, selected: false }, { number: 27, booked: false, selected: false },
    { number: 28, booked: false, selected: false }, { number: 29, booked: true, selected: false }, { number: 30, booked: false, selected: false },
    { number: 31, booked: false, selected: false }, { number: 32, booked: false, selected: false }, { number: 33, booked: false, selected: false },
    { number: 34, booked: false, selected: false }, { number: 35, booked: false, selected: false },
  ];

  get totalFare() {
    return this.seats.filter(seat => seat.selected).length * this.pricePerSeat;
  }

  toggleSeat(seat: Seat) {
    if (!seat.booked) {
      seat.selected = !seat.selected;
    }
  }
  selectedBus: any = null;

busService=inject(SeatServiceService)

  ngOnInit() {
    this.busService.currentBus.subscribe(bus => {
      this.selectedBus = bus;
    });
  }
}



