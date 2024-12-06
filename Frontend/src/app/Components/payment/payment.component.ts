import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeatServiceService } from '../../Services/seat-service.service';
import { ReservationService } from '../../Services/reservation.service';
import { Reservation } from '../../Models/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from '../../Models/bus';
import { BusService } from '../../Services/bus.service';
import { RouteService } from '../../Services/route.service';
import { Route } from '../../Models/route.model';
import { TicketService } from '../../Services/ticket.service';
import { Ticket } from '../../Models/ticket';
import { forkJoin } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Booking } from '../../Models/bookings';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentOptions = [
    { id: 1, name: 'UPI', details: ['Enter UPI ID'], icon: 'assets/icons/upi.png' },
    { id: 2, name: 'PhonePe', details: ['Enter UPI ID'], icon: 'assets/icons/phonepe.png' },
    { id: 3, name: 'Google Pay', details: ['Enter UPI ID'], icon: 'assets/icons/googlepay.jpeg' },
    { id: 4, name: 'Simpl', details: ['Enter Details'], icon: 'assets/icons/simpl.png' },
    { id: 5, name: 'Debit / Credit Card', details: ['Card Number', 'CVV'], icon: 'assets/icons/card.png' },
    { id: 6, name: 'Net Banking', details: ['Account Number', 'IFSC Code'], icon: 'assets/icons/netbanking.png' },
    
    { id: 7, name: 'Wallets', details: ['Enter Wallet Details'], icon: 'assets/icons/wallet.png' },
    { id: 8, name: 'Amazon Pay', details: ['Amazon Pay ID'], icon: 'assets/icons/amazonpay.png' }
  ];

  currBusId!: number;
  currBus!: Bus;
  busroute!: Route;
  date!: string;
  seatsData: number[] = [];
  selectedPaymentMethodId: number | null = null;
  currUser = Number(localStorage.getItem('loginUser'));
  bookingId!: number;
  passengers: any[] = [];
  state!: string;
  contact!: string
  reservationId: number[] = []
  ticketSaved: boolean = false
  tosave: boolean = false
  tickets: Ticket[] = [];
  bookings!:Booking;
  currentUser!:User;
  isLoading = false;
  isTransactionSuccessful = false;
  constructor(
    private seatService: SeatServiceService,
    private routeService: RouteService,
    private busService: BusService,
    private ticketService: TicketService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.getSeats();
    this.route.params.subscribe((data) => {
      this.currBusId = +data['id'];
      this.getCurrentBus();
    });

    this.seatService.date.subscribe((dateString) => {
      this.date = dateString;
    });
    this.ticketService.passengers.subscribe((data) => {
      if (data && Array.isArray(data)) {
        this.passengers = data; // Ensure it's an array
      } else {
        this.passengers = []; // Default to empty array if not valid
      }
      console.log(this.passengers);
    });
    this.ticketService.contact.subscribe((data) => {
      this.contact = data
    });
    this.ticketService.state.subscribe((data) => {
      this.state = data
    });
    console.log(this.currUser);
this.userService.getUserById(this.currUser).subscribe((data)=>{
  this.currentUser=data;
})
  }
  

  selectPaymentMethod(id: number) {
    this.selectedPaymentMethodId = this.selectedPaymentMethodId === id ? null : id;
  }

  payNow() {
    const selectedOption = this.paymentOptions.find(option => option.id === this.selectedPaymentMethodId);

    if (selectedOption) {
      this.isLoading = true;
      this.bookingId = Math.floor(Math.random() * 90000) + 10000;

      // Create an array to hold reservations
      const reservations: Reservation[] = [];

      this.seatsData.forEach(element => {
        const reservation = new Reservation(this.currUser);
        reservation.bus_id = this.currBusId;
        reservation.reservationDate = this.date;
        reservation.seatNumber = element;
        reservation.bookingId = this.bookingId;
        reservation.bus_id=this.currBusId;
        reservation.status = 'CONFIRMED';
        
console.log(reservation);

        reservations.push(reservation); // Store each reservation
      });

      // Create an array of observables
      const reservationObservables = reservations.map(reservation => this.book(reservation));

      // Use forkJoin to wait for all reservations to complete
      forkJoin(reservationObservables).subscribe({
        next: () => {
          // All reservations are successful, now add passengers
          this.addPassengers();
        },
        error: (err) => {
          console.error('Error during booking:', err);
          this.isLoading = false;
        },
        complete: () => {
          setTimeout(() => {
            this.isTransactionSuccessful = true; // Show success animation
            setTimeout(() => {
              this.router.navigateByUrl('ticket/' + this.bookingId);
            }, 2000); // Redirect after 2 seconds
          }, 1000); // Simulate processing delay
        }
      });
    
    }
   
  }
  sendEmail() {
    const emailPayload = {
        to: this.currentUser.email,

        bookingId: this.bookingId,
        source: this.busroute.source,
        destination: this.busroute.destination,
        deptTime: this.currBus.deptTime,
        arrTime: this.currBus.arrTime,
        date: this.date,
        operator: this.currBus.operator,
        passengers: this.passengers.map(p => p.name),
        seatNumbers: this.seatsData
    };

    this.http.post('http://localhost:8080/api/email/send-ticket', emailPayload).subscribe({
        next: () => {
            console.log('Email sent successfully!');
        },
        error: (err) => {
            console.error('Failed to send email:', err);
        }
    });
}

  book(reservation: Reservation) {
    return this.reservationService.createTicket(reservation).pipe(
      tap((newReservation) => {
        if (newReservation && newReservation.id) {
          this.reservationId.push(newReservation.id); // Store reservation ID
          console.log('Reservation ID:', this.reservationId);
        } else {
          console.error('New reservation does not have an ID:', newReservation);
        }
      }),
      catchError((error) => {
        console.error('Error creating reservation:', error);
        return of(null); // Return a null observable in case of error
      })
    );
  }

  getSeats() {
    this.seatService.seatSelected.subscribe((data: number[]) => {
      this.seatsData = data;

    });
  } 
  getSelectedPaymentMethod() {
    return this.paymentOptions.find(option => option.id === this.selectedPaymentMethodId);
  }
  



  getCurrentBus() {
    this.busService.getBus(this.currBusId).subscribe({
      next: (data: Bus) => {
        this.currBus = data;
        this.getRoute();
      },
      error: (error) => {
        console.error('Error fetching bus:', error);
      }
    });
  }

  getRoute() {
    if (this.currBus && this.currBus.route_id) {
      this.routeService.getRouteById(this.currBus.route_id).subscribe({
        next: (data: any) => {
          this.busroute = data;
        },
        error: (error) => {
          console.error('Error fetching route:', error);
        }
      });
    } else {
      console.error('Current bus or route ID is undefined');
    }
  }
  index: number = 0
  addPassengers() {
    this.passengers.forEach((data) => {
      const ticket = new Ticket();
      ticket.name = data.name;
      ticket.age = data.age;
      ticket.gender = data.gender;
      ticket.stateOfResidence = this.state; 
      ticket.contactDetails = this.contact; 
      ticket.reservation_id = this.reservationId[this.index];
      
      this.index++;
      const booking=new Booking(this.bookingId,this.busroute.source,this.busroute.destination,this.currBus.arrTime,this.currBus.deptTime,this.date,this.currBus.operator,this.currBus.busNumber,this.currBus.id,'CONFIRMED');
this.ticketService.booking.next(booking);
this.ticketService.seatNumber.next(this.seatsData);
      
      // Push the ticket to the array
      this.tickets.push(ticket);
  
      this.ticketService.saveTicket(ticket).subscribe({
        next: () => {
          // Handle successful ticket save if needed
        },
        error: (error) => {
          console.error('Error saving ticket:', error);
        }
      });
    });
  
    console.log('Tickets before setting data:', this.tickets);
    
  
    this.ticketService.setTicketsData(this.tickets);
    

    console.log('Tickets after setting data:', this.tickets);
  
   
   
  }
 

}