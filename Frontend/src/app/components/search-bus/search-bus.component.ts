import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SeatServiceService } from '../../Services/seat-service.service';
import { BusService } from '../../Services/bus.service';
import { Bus } from '../../Models/bus';




@Component({
  selector: 'app-search-bus',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './search-bus.component.html',
  styleUrl: './search-bus.component.css'
})
export class SearchBusComponent {
  route=inject(Router)
  

constructor(private seatService: SeatServiceService,private busService: BusService) {}
selectedRoute: any;

 
  ngOnInit() {
    this.seatService.selectedRoute.subscribe(route => {
      this.selectedRoute = route;
      console.log('Selected route:', this.selectedRoute);
    });
    this.getBuses()
  }

  selectBus(bus: any) {
    this.seatService.selectBus(bus);
    

  }

  buses: Bus[] = [];
  selectedBus: Bus | null = null;


 

  // loadAllBuses(): void {
  //   this.busService.getAllBuses().subscribe(
  //     (data: Bus[]) => {
  //       this.buses = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching buses:', error);
  //     }
  //   );
  // }

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
    this.busService.deleteBus(id).subscribe(() => {
      this.buses = this.buses.filter(bus => bus.id !== id);
    }, error => {
      console.error('Error deleting bus:', error);
    });
  }

  updateBus(id: number, bus: Bus): void {
    this.busService.updateBus(id, bus).subscribe(
      (updatedBus) => {
        const index = this.buses.findIndex(b => b.id === id);
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

  getBuses(){
    this.busService.buses$.subscribe((data)=>{
      this.buses=data
    })
  }
  calculateTimeDifference(arrivalTime: string, departureTime: string): string {
    const arrTime = new Date(`1970-01-01T${arrivalTime}Z`);
    const deptTime = new Date(`1970-01-01T${departureTime}Z`);
    const diff = (arrTime.getTime() - deptTime.getTime()) / 1000; // difference in seconds

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    
    return `${hours}h ${minutes}m`;
  }

}
