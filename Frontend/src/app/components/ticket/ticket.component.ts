import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../Models/reservation';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})

export class TicketComponent implements OnInit {
  reservation!: Reservation;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const reservationData = this.route.snapshot.paramMap.get('reservation');
    this.reservation = reservationData ? JSON.parse(reservationData) : null;
  }
}

