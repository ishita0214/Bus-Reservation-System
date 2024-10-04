import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface Bus {
  name: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
}
@Injectable({
  providedIn: 'root'
})
export class SeatServiceService {

  private selectedBusSource = new BehaviorSubject<Bus | null>(null);
  currentBus = this.selectedBusSource.asObservable();

  private selectedRouteSource = new BehaviorSubject<any>(null);
  selectedRoute = this.selectedRouteSource.asObservable();

  constructor() {}

  selectBus(bus: Bus) {
    this.selectedBusSource.next(bus);
  }
  selectRoute(route: any) {
    this.selectedRouteSource.next(route);
  }
}


// export class SeatServiceService {
//   private selectedRouteSource = new BehaviorSubject<any>(null);
//   selectedRoute$ = this.selectedRouteSource.asObservable();

//   selectRoute(route: any) {
//     this.selectedRouteSource.next(route);
//   }
// }

