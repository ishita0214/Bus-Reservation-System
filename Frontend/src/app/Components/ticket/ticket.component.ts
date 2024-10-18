import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../Models/reservation';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../Services/ticket.service';
import { Ticket } from '../../Models/ticket';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
  reservation!: Reservation;
  ticket!: any;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    const reservationData = this.route.snapshot.paramMap.get('reservation');
    this.reservation = reservationData ? JSON.parse(reservationData) : null;

    this.ticketService.currentTicket$.subscribe({
      next: (data) => {
        this.ticket = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  saveTicketData(){
    this.ticketService.saveTicket(this.ticket).subscribe({
      next:(data)=>{
        alert("Ticket saved successfully!!!")
      }
    })
  }

}
