import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent { 
  paymentOptions = [
    { id: 1, name: 'Credit Card', details: ['Card Number', 'CVV'] },
    { id: 2, name: 'Debit Card', details: ['Card Number', 'CVV'] },
    { id: 3, name: 'PayPal', details: ['UPI ID'] },
    { id: 4, name: 'Google Pay', details: ['UPI ID'] },
    { id: 5, name: 'Apple Pay', details: ['Apple ID'] },
    { id: 6, name: 'Bank Transfer', details: ['Account Number', 'IFSC Code'] },
    { id: 7, name: 'Cryptocurrency', details: ['Wallet Address'] }
  ];

  selectedPaymentMethodId: number | null = null;

  selectPaymentMethod(id: number) {
    this.selectedPaymentMethodId = this.selectedPaymentMethodId === id ? null : id;
  }

  payNow() {
    const selectedOption = this.paymentOptions.find(option => option.id === this.selectedPaymentMethodId);
    if (selectedOption) {
      alert(`Proceeding to pay with ${selectedOption.name}`);
    }
  }
}
