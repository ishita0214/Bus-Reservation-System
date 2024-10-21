import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeatServiceService } from '../../Services/seat-service.service';
import { ReservationService } from '../../Services/reservation.service';
import { Reservation } from '../../Models/reservation';
import { ActivatedRoute } from '@angular/router';
import { Bus } from '../../Models/bus';
import { BusService } from '../../Services/bus.service';
import { RouteService } from '../../Services/route.service';
import { Route } from '../../Models/route.model';

interface Seat {
  number: number;
  booked: boolean;
  selected: boolean;
}
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentOptions = [
    { id: 1, name: 'Credit Card', details: ['Card Number', 'CVV'] },
    { id: 2, name: 'Debit Card', details: ['Card Number', 'CVV'] },
    { id: 3, name: 'PayPal', details: ['UPI ID'] },
    { id: 4, name: 'Google Pay', details: ['UPI ID'] },
    { id: 5, name: 'Apple Pay', details: ['Apple ID'] },
    { id: 6, name: 'Bank Transfer', details: ['Account Number', 'IFSC Code'] },
    { id: 7, name: 'Cryptocurrency', details: ['Wallet Address'] }
  ];

  currBusId!: number;
  currBus!: Bus;
  busroute!: Route;
  date!: string;
  seatsData: number[] = [];
  selectedPaymentMethodId: number | null = null;
  currUser:any=localStorage.getItem('loginUser');

  constructor(
    private seatService: SeatServiceService,
    private routeService: RouteService,
    private busService: BusService,
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSeats();
    this.route.params.subscribe((data) => {
      this.currBusId = +data['id'];
      this.getCurrentBus();
    });

    this.seatService.date.subscribe((dateString) => {
      this.date = dateString;
    });
  }
  
  selectPaymentMethod(id: number) {
    this.selectedPaymentMethodId = this.selectedPaymentMethodId === id ? null : id;
  }

  payNow() {
    const selectedOption = this.paymentOptions.find(option => option.id === this.selectedPaymentMethodId);
  
    if (selectedOption) {
      this.seatsData.forEach(element => {
        console.log(element);
        
        const reservation = new Reservation();
      reservation.user_id = this.currUser; // Get user ID from your auth service or context
      reservation.bus_id = this.currBusId;
      reservation.reservationDate = this.date; // This is already formatted as 'yyyy-mm-dd'
      reservation.seatNumber = element; // Use selected seat numbers here
  
  
      // Call the booking method
      this.book(reservation);
        
      });
      
     
      
      alert(`Proceeding to pay with ${selectedOption.name}`);
    }
  }
  

  book(reservation: Reservation) {
    this.reservationService.createTicket(reservation).subscribe(
      (newReservation) => {
        
        
      },
      (error) => {
        console.error('Error creating reservation:', error);
      }
    );
  }

  getSeats() {
    this.seatService.seatSelected.subscribe((data: number[]) => { // Expecting an array of numbers
      this.seatsData = data; 
      
    });
  }
  
  

  getCurrentBus() {
    this.busService.getBus(this.currBusId).subscribe((data: Bus) => {
      this.currBus = data;
      this.getRoute();
    }, error => {
      console.error('Error fetching bus:', error);
    });
  }

  getRoute() {
    if (this.currBus && this.currBus.route_id) {
      this.routeService.getRouteById(this.currBus.route_id).subscribe((data: any) => {
        this.busroute = data;
      }, error => {
        console.error('Error fetching route:', error);
      });
    } else {
      console.error('Current bus or route ID is undefined');
    }
  }
}
