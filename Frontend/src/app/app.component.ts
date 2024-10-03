import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBusComponent } from "../components/search-bus/search-bus.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchBusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
