import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CalendarModule } from 'primeng/calendar';
import { BusesService } from '../Services/buses.service';
// import { Buses } from '../Models/buses.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatDatepickerModule,CalendarModule,FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  date1:Date | undefined;
  // buses: Buses[]=[];
  
  constructor(private busService:BusesService){}
  ngOnInit(): void {
    this.getBuses();
  }
  
  getBuses(): void {
    this.busService.getBuses().subscribe(
      {
        next:(buses)=>{
          console.log(buses);
          // this.buses = buses;

        },
        error:(error)=>{
          console.error("Error fetching buses's routes:", error)
        },
        complete:()=>{
        }
      }
    );
  }


  addRoute(){
    this.busService.addRoute().subscribe((res:any)=>{
      if(res.result){
        alert("Route added")
      }
    })
  }

}
