package com.example.bus_reservation_system.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bus_reservation_system.entity.EmailPayload;
import com.example.bus_reservation_system.services.EmailService;
import com.example.bus_reservation_system.services.PdfGenerator;

import jakarta.mail.MessagingException;

import java.util.List;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins="http://localhost:4200")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-ticket")
    public ResponseEntity<?> sendTicket(@RequestBody EmailPayload payload) {
        try {
            // Generate PDF
            byte[] pdfData = PdfGenerator.generateTicketPdf(
                payload.getBookingId(),
                payload.getSource(),
                payload.getDestination(),
                payload.getDeptTime(),
                payload.getArrTime(),
                payload.getDate(),
                payload.getOperator(),
                payload.getPassengers(),
                payload.getSeatNumbers()
            );

            // Send Email
            emailService.sendEmailWithAttachment(
                payload.getTo(),
                "Your Ticket Confirmation",
                "Please find your ticket attached.",
                pdfData
            );

            return ResponseEntity.ok("Email sent successfully.");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        }
    }
}
