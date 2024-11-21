import { Component, inject } from '@angular/core';
import { Ticket } from '../../Models/ticket';
import { ReservationService } from '../../Services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../../Models/bookings';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import { Details } from '../../Models/details';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../Services/ticket.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  constructor(private reservationService: ReservationService, private route: ActivatedRoute, private ticketService: TicketService) { }
  ngOnInit(): void {

    this.route.params.subscribe((data) => {
      this.bookingId = +data['bookingId'];
      this.getDetails(this.bookingId);
    })
    this.reservationService.tickets.subscribe((data) => {
      this.bookingDetails = data;
      console.log(this.bookingDetails);
    })

  }
  bookingDetails!: Booking
  details: Details[] = []
  bookingId!: number

  getDetails(bookingId: number) {
    this.reservationService.getPassengerDetails(bookingId).subscribe((data) => {
      this.details = data;
      console.log(this.details);
    })
  }
  downloadETicket() {
    if (!this.bookingDetails || !this.details || this.details.length === 0) {
      console.error('No booking details or passengers available to generate PDF.');
      return;
    }
  
    const doc = new jsPDF('p', 'pt', 'a4');
  
    // Function to draw table cell with border and background
    const drawTableCell = (x: number, y: number, width: number, height: number, text: string, isHeader = false) => {
      // Cell background
      doc.setFillColor(isHeader ? 64 : 255, isHeader ? 64 : 255, isHeader ? 64 : 255);
      doc.rect(x, y, width, height, 'F');
  
      // Cell border
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.rect(x, y, width, height);
  
      // Cell text
      doc.setTextColor(0);
      doc.setFontSize(11);
      doc.setFont(isHeader ? 'bold' : 'normal');
  
      // Center text vertically and add left padding
      const textPadding = 10;
      const textY = y + (height / 2) + 4;
      doc.text(text, x + textPadding, textY);
    };
  
    // White background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
  
    // Header with PNR and Logo
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('PNR:', 40, 40);
    doc.setFontSize(14);
    doc.text(this.bookingDetails.bookingId.toString(), 40, 60);
  
    // Logo placeholder
    doc.setFillColor(0, 0, 255); // Blue color for the logo section
    doc.rect(doc.internal.pageSize.getWidth() - 120, 20, 100, 30, 'F');
    doc.setTextColor(255);
    doc.setFontSize(16);
    doc.text('BlueBus', doc.internal.pageSize.getWidth() - 110, 40);
  
    // Add route information (source to destination)
    const headerBoxY = 80;
    doc.setFillColor(240, 240, 240);
    doc.rect(40, headerBoxY, doc.internal.pageSize.getWidth() - 80, 60, 'F');
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text(`${this.bookingDetails.source} TO ${this.bookingDetails.destination} - CONFIRMED`, 60, headerBoxY + 25);
    doc.text(`Nonstop • ${this.formatDuration(this.bookingDetails.deptTime, this.bookingDetails.arrTime)}`, 60, headerBoxY + 45);
  
    // Add Departure, Duration, and Arrival Time
    const timeTableY = headerBoxY + 80;
    doc.setFontSize(12);
    doc.text(this.formatTime(this.bookingDetails.deptTime), 60, timeTableY);
    doc.text(this.formatTime(this.bookingDetails.arrTime), doc.internal.pageSize.getWidth() - 160, timeTableY);
  
    // Terminal Info
    const terminalY = timeTableY + 40;
    doc.setFontSize(12);
    doc.text('Terminal 2', 60, terminalY);
    doc.text('Terminal 1', doc.internal.pageSize.getWidth() - 160, terminalY);
  
    // Add baggage allowance and note
    const baggageY = terminalY + 40;
    doc.setFontSize(12);
    doc.setFont('bold');
    doc.text('Baggage Allowance: 15KG', 60, baggageY);
    doc.setFont('normal');
    doc.text('Note: Reach the bus stop 15 minutes prior to the departure time.', 60, baggageY + 20);
  
    // Add Passenger Details Table
    const tableY = baggageY + 60;
    const headers = ['Travellers', 'Gender', 'Seat number'];
    const columnWidths = [200, 150, 150];
    const rowHeight = 40;
    let currentY = tableY;
  
    // Draw table title
    doc.setFontSize(14);
    doc.setFont('bold');
    doc.text('Passenger Details', 60, currentY - 20);
  
    // Calculate total table width
    const tableWidth = columnWidths.reduce((sum, width) => sum + width, 0);
  
    // Draw outer table border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.rect(60, currentY, tableWidth, (this.details.length + 1) * rowHeight);
  
    // Draw table headers
    let currentX = 60;
    headers.forEach((header, index) => {
      drawTableCell(currentX, currentY, columnWidths[index], rowHeight, header, true);
      currentX += columnWidths[index];
    });
  
    // Draw table data rows
    currentY += rowHeight;
    this.details.forEach((passenger) => {
      currentX = 60;
      const rowData = [
        ` ${passenger.name}`,
        passenger.gender.toString(),
        passenger.seatNumber.toString()
      ];
  
      rowData.forEach((cellData, colIndex) => {
        drawTableCell(currentX, currentY, columnWidths[colIndex], rowHeight, cellData);
        currentX += columnWidths[colIndex];
      });
      currentY += rowHeight;
    });
  
    // Add Important Information Section
    const importantY = currentY + 40;
    doc.setFontSize(12);
    doc.setFont('bold');
    doc.text('Important Information', 60, importantY);
    doc.setFont('normal');
    doc.text('- Please reach the boarding point by the reporting time.', 60, importantY + 20);
    doc.text('- In case of any issues, contact Customer Support.', 60, importantY + 40);
  
    // Add Terms and Conditions Section
    const termsY = importantY + 80;
    doc.setFontSize(12);
    doc.setFont('bold');
    doc.text('Terms and Conditions', 60, termsY);
    doc.setFont('normal');
    doc.text('• The arrival and departure times mentioned are tentative.', 60, termsY + 20);
    doc.text('• Reach the boarding point at least 15 minutes before the scheduled time.', 60, termsY + 40);
  
    // Add Cancellation Policy Section
    const cancelY = termsY + 80;
    doc.setFontSize(12);
    doc.setFont('bold');
    doc.text('Cancellation Policy', 60, cancelY);
    doc.setFont('normal');
    doc.text('• Before 18:00: 85% refund', 60, cancelY + 20);
    doc.text('• Between 18:00 & 20:00: 70% refund', 60, cancelY + 40);
  
    // Add Footer Section
    const footerY = cancelY + 80;
    doc.setFontSize(12);
    doc.setFont('italic');
    doc.text('Proud to be driving India. LIVE TRACKING | FREE CANCELLATIONS | INSTANT REFUND', 60, footerY);
  
    // Save the PDF
    doc.save('bus-ticket.pdf');
  }
  

  private formatTime(time: string): string {
    return new Date('1970-01-01T' + time).toLocaleTimeString('en-US',
      { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  private formatDuration(start: string, end: string): string {
    const startTime = new Date('1970-01-01T' + start);
    const endTime = new Date('1970-01-01T' + end);
    const diff = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;



  }
  showCheckboxes: boolean = false;


  toggleCheckboxes() {
    this.showCheckboxes = !this.showCheckboxes;
  }



  router = inject(Router);

  cancelTicket() {
    const deleteObservables: Observable<void>[] = [];

    this.details.forEach((data) => {
      if (data.selected) {
        console.log(data.id);
      this.ticketService.deleteTicket(data.id).subscribe(()=>{ 
        console.log(data.seatNumber);
        this.checkAndDeleteReservation(data.seatNumber)
        this.getDetails(this.bookingId); // Refresh details after deletion
     this.details.length--;
        console.log(this.details.length);
        
        if(this.details.length===0){
          this.router.navigateByUrl('bookings')
        }
       });
     
      }
      
    });
   
    
    
  }

  checkAndDeleteReservation(seatNumber: number) {
    console.log("data");
    
    // Check if there are any remaining passengers in the reservation
    this.reservationService.getTicketsBySeatNumber(seatNumber).subscribe((reservation) => {



      console.log(reservation);
      reservation.forEach((res)=>{

   if(res.id)
      // If no tickets left, delete the reservation
      this.reservationService.deleteTicket(res.id).subscribe(() => {
        console.log('Reservation deleted a');
      });   })
    })
  
}
}
