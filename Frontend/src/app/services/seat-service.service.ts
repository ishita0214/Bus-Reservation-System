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

  constructor() {}

  selectBus(bus: Bus) {
    this.selectedBusSource.next(bus);
  }
}
