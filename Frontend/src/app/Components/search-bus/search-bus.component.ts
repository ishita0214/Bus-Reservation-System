import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SeatServiceService } from '../../Services/seat-service.service';
import { BusService } from '../../Services/bus.service';
import { Bus } from '../../Models/bus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../constants/constant';

@Component({
  selector: 'app-search-bus',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './search-bus.component.html',
  styleUrl: './search-bus.component.css',
})
export class SearchBusComponent {
[x: string]: any;
  route = inject(Router);

  constructor(
    private seatService: SeatServiceService,
    private busService: BusService,
    private fb:FormBuilder
  ) {
  
  }
  // selectedRoute: any;

  ngOnInit() {
    this.getBuses();
  }

  selectBus(bus: any,id:number|undefined) {
if(localStorage.getItem('loginUser')){
  this.route.navigateByUrl('seats/'+id)
  this.seatService.selectBus(bus);
}else{
alert("Login first!")
}
    
  }

  buses: Bus[] = [];

  addBus(bus: Bus): void {
    this.busService.createBus(bus).subscribe(
      (newBus) => {
        this.buses.push(newBus);
      },
      (error) => {
        console.error('Error adding bus:', error);
      }
    );
  }

  deleteBus(id: number): void {
    this.busService.deleteBus(id).subscribe(
      () => {
        this.buses = this.buses.filter((bus) => bus.id !== id);
      },
      (error) => {
        console.error('Error deleting bus:', error);
      }
    );
  }

  updateBus(id: number, bus: Bus): void {
    this.busService.updateBus(id, bus).subscribe(
      (updatedBus) => {
        const index = this.buses.findIndex((b) => b.id === id);
        if (index !== -1) {
          this.buses[index] = updatedBus;
        }
      },
      (error) => {
        console.error('Error updating bus:', error);
      }
    );
  }

  searchBuses(source: string, destination: string, date: string): void {
    this.busService.getBuses(source, destination, date).subscribe(
      (data: Bus[]) => {
        this.buses = data;
      },
      (error) => {
        console.error('Error searching buses:', error);
      }
    );
  }

  getBuses() {
    this.busService.buses$.subscribe((data) => {
      this.buses = data;
    });
  }
  calculateTimeDifference(arrivalTime: string, departureTime: string): string {
    const arrTime = new Date(`1970-01-01T${arrivalTime}Z`);
    const deptTime = new Date(`1970-01-01T${departureTime}Z`);
    const diff = (arrTime.getTime() - deptTime.getTime()) / 1000; 

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    return `${hours}h ${minutes}m`;
  }
}

