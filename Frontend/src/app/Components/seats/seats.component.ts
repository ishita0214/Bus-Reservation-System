import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SeatServiceService } from '../../Services/seat-service.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { Bus } from '../../Models/bus';
import { BusService } from '../../Services/bus.service';
import { RouteService } from '../../Services/route.service';
import { Route } from '../../Models/route.model';
import { TicketService } from '../../Services/ticket.service';

interface Seat {
  number: number;
  booked: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.css',
})
export class SeatsComponent implements OnInit {

  showButton: boolean = false;
  currBusId!: number;
  currBus!: Bus;
  busroute!: Route;
  date!: string;
  seats: Seat[] = [
    { number: 1, booked: false, selected: false },
    { number: 2, booked: false, selected: false },
    { number: 3, booked: false, selected: false },
    { number: 4, booked: false, selected: false },
    { number: 5, booked: false, selected: false },
    { number: 6, booked: false, selected: false },
    { number: 7, booked: false, selected: false },
    { number: 8, booked: false, selected: false },
    { number: 9, booked: false, selected: false },
    { number: 10, booked: false, selected: false },
    { number: 11, booked: false, selected: false },
    { number: 12, booked: false, selected: false },
    { number: 13, booked: false, selected: false },
    { number: 14, booked: false, selected: false },
    { number: 15, booked: false, selected: false },
    { number: 16, booked: false, selected: false },
    { number: 17, booked: false, selected: false },
    { number: 18, booked: false, selected: false },
    { number: 19, booked: false, selected: false },
    { number: 20, booked: false, selected: false },
    { number: 21, booked: false, selected: false },
    { number: 22, booked: false, selected: false },
    { number: 23, booked: false, selected: false },
    { number: 24, booked: false, selected: false },
    { number: 25, booked: false, selected: false },
    { number: 26, booked: false, selected: false },
    { number: 27, booked: false, selected: false },
    { number: 28, booked: false, selected: false },
    { number: 29, booked: false, selected: false },
    { number: 30, booked: false, selected: false },
    { number: 31, booked: false, selected: false },
    { number: 32, booked: false, selected: false },
    { number: 33, booked: false, selected: false },
    { number: 34, booked: false, selected: false },
    { number: 35, booked: false, selected: false },
    { number: 36, booked: false, selected: false },
    { number: 37, booked: false, selected: false },
    { number: 38, booked: false, selected: false },
    { number: 39, booked: false, selected: false },
    { number: 40, booked: false, selected: false },
    { number: 41, booked: false, selected: false },
    { number: 42, booked: false, selected: false },
    { number: 43, booked: false, selected: false },
    { number: 44, booked: false, selected: false },
    { number: 45, booked: false, selected: false },
  ];

  get totalFare() {
    return (
      this.seats.filter((seat) => seat.selected).length * this.currBus.price
    );
  }

  selectedBus: any = null;

  reservationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private seatService: SeatServiceService,
    private route: ActivatedRoute,
    private busService: BusService,
    private routeService: RouteService,
    private ticketService:TicketService
  ) {}

  ngOnInit(): void {
    this.seatService.currentBus.subscribe((bus: any) => {
      this.selectedBus = bus;
    });

    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      stateOfResidence: ['', Validators.required],
      contactDetails: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      donation: [false],
      insurance: [false],
    });

    this.route.params.subscribe((data) => {
      this.currBusId = +data['id'];
      this.getCurrentBus();
    });
    
    this.getDate();
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log(this.reservationForm.value);
      console.log('Data saved');
      console.log(this.selectedSeats);

      this.ticketService.setTicketData(this.reservationForm.value);

      
      this.router.navigateByUrl('payment/' + this.currBusId);
    }
  }
  selectedSeats: Seat[] = []; 

  toggleSeat(seat: Seat) {
    this.showButton = true;

    if (!seat.booked) {
      seat.selected = !seat.selected;

     
      if (seat.selected) {
        this.selectedSeats.push(seat);
      } else {
        this.selectedSeats = this.selectedSeats.filter(
          (s) => s.number !== seat.number
        );
      }

      
      const selectedSeatNumbers: number[] = this.selectedSeats.map((s) => {
        return s.number;
      });

      console.log(selectedSeatNumbers);

      this.seatService.seatSelected.next(selectedSeatNumbers);
    }
  }

  createReservationForm() {
    const seatForms = this.selectedSeats.map((seat) => {
      return this.fb.group({
        name: ['', Validators.required],
        gender: ['', Validators.required],
        age: [
          '',
          [Validators.required, Validators.min(1), Validators.max(120)],
        ],
      });
    });

    this.reservationForm = this.fb.group({
      seats: this.fb.array(seatForms),
      stateOfResidence: ['', Validators.required],
      contactDetails: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      donation: [false],
    });
  }

  getCurrentBus() {
    this.busService.getBus(this.currBusId).subscribe(
      (data: Bus) => {
        this.currBus = data;
        console.log("getting current bus data: ",data);
        
        this.ticketService.setBusData(data);

        this.getRoute();
      },
      (error) => {
        console.error('Error fetching bus:', error);
      }
    );
  }
  getRoute() {
    if (this.currBus && this.currBus.route_id) {
      this.routeService.getRouteById(this.currBus.route_id).subscribe(
        (data: any) => {
          this.busroute = data;
        },
        (error) => {
          console.error('Error fetching route:', error);
        }
      );
    } else {
      console.error('Current bus or route ID is undefined');
    }
  }

  getDate() {
    this.seatService.date.subscribe((data) => {
      this.date = data;
      console.log(this.date);
    });
  }
  router = inject(Router);

}
