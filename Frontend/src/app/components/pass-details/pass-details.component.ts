import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pass-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pass-details.component.html',
  styleUrl: './pass-details.component.css'
})
export class PassDetailsComponent {
  passenger = {
    name: '',
    age: null,
    gender: '',
    contact: ''
};

onSubmit() {
    console.log('Passenger Details:', this.passenger);
}

}
