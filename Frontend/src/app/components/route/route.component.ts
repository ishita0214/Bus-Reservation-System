import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { RouteService } from '../../Services/route.service';

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent {
  routes: Route[] = [];

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes(): void {
    this.routeService.getAllRoutes().subscribe((data) => {
      this.routes = data;
    });
  }

}
