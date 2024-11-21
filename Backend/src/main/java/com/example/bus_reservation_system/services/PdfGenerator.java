package com.example.bus_reservation_system.services;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.util.List;

public class PdfGenerator {

    public static byte[] generateTicketPdf(String bookingId, String source, String destination, String deptTime,
                                           String arrTime, String date, String operator,
                                           List<String> passengers, List<Integer> seatNumbers) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4, 36, 36, 36, 36); // Set margins (left, right, top, bottom)
            PdfWriter.getInstance(document, baos);
            document.open();

            // Custom fonts and colors
            Font titleFont = new Font(Font.HELVETICA, 20, Font.BOLD, new Color(0, 102, 204)); // Blue
            Font subTitleFont = new Font(Font.HELVETICA, 14, Font.BOLD, new Color(64, 64, 64)); // Dark gray
            Font normalFont = new Font(Font.HELVETICA, 12, Font.NORMAL, Color.BLACK); // Black
            Font headerFont = new Font(Font.HELVETICA, 12, Font.BOLD, Color.WHITE); // White

            // Add Title Section
            PdfPTable headerTable = new PdfPTable(2);
            headerTable.setWidthPercentage(100);
            headerTable.setWidths(new float[]{3, 1}); // 75% left, 25% right

            // Left: Ticket Info
            PdfPCell leftCell = new PdfPCell();
            leftCell.setBorder(Rectangle.NO_BORDER);
            leftCell.addElement(new Paragraph("PNR: " + bookingId, subTitleFont));
            leftCell.addElement(new Paragraph(source + " TO " + destination + " - CONFIRMED", titleFont));
            leftCell.addElement(new Paragraph("Nonstop • 1h 30m", normalFont));
            headerTable.addCell(leftCell);

            // Right: Logo
            PdfPCell rightCell = new PdfPCell();
            rightCell.setBorder(Rectangle.NO_BORDER);
            rightCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            Image logo = Image.getInstance("/home/isha/bus-reservation-system/Backend/src/main/java/com/example/bus_reservation_system/logo/blueBusLogo.jpg"); // Replace with your logo path
            logo.scaleAbsolute(100, 50);
            rightCell.addElement(logo);
            headerTable.addCell(rightCell);

            document.add(headerTable);

            // Add spacing
            document.add(new Paragraph("\n"));

            // Add Departure, Duration, and Arrival Time
            PdfPTable timeTable = new PdfPTable(3);
            timeTable.setWidthPercentage(100);
            timeTable.setSpacingBefore(10);
            timeTable.setSpacingAfter(10);
            timeTable.setWidths(new float[]{2, 1, 2}); // Equal distribution of columns

            // Departure Time
            PdfPCell deptCell = new PdfPCell(new Paragraph(deptTime, subTitleFont));
            deptCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            deptCell.setBorder(Rectangle.NO_BORDER);
            timeTable.addCell(deptCell);

            // Duration
            PdfPCell durationCell = new PdfPCell(new Paragraph("1h 30m", normalFont));
            durationCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            durationCell.setBorder(Rectangle.NO_BORDER);
            timeTable.addCell(durationCell);

            // Arrival Time
            PdfPCell arrCell = new PdfPCell(new Paragraph(arrTime, subTitleFont));
            arrCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            arrCell.setBorder(Rectangle.NO_BORDER);
            timeTable.addCell(arrCell);

            document.add(timeTable);

            // Terminal Info
            PdfPTable terminalTable = new PdfPTable(2);
            terminalTable.setWidthPercentage(100);
            terminalTable.setWidths(new float[]{1, 1}); // Equal widths

            PdfPCell terminalDept = new PdfPCell(new Paragraph("Terminal 2", normalFont));
            terminalDept.setHorizontalAlignment(Element.ALIGN_CENTER);
            terminalDept.setBorder(Rectangle.NO_BORDER);
            terminalTable.addCell(terminalDept);

            PdfPCell terminalArr = new PdfPCell(new Paragraph("Terminal 1", normalFont));
            terminalArr.setHorizontalAlignment(Element.ALIGN_CENTER);
            terminalArr.setBorder(Rectangle.NO_BORDER);
            terminalTable.addCell(terminalArr);

            document.add(terminalTable);

            // Add spacing
            document.add(new Paragraph("\n"));

            // Add baggage allowance and note
            document.add(new Paragraph("Baggage Allowance: 15KG", normalFont));
            document.add(new Paragraph("Note: Reach the bus stop 15 minutes prior to the departure time.", normalFont));

            // Add spacing
            document.add(new Paragraph("\n"));

            // Passenger Details Table
            PdfPTable passengerTable = new PdfPTable(3);
            passengerTable.setWidthPercentage(100);
            passengerTable.setSpacingBefore(20);
            passengerTable.setWidths(new float[]{2, 1, 1}); // Set column widths

            // Header Row
            PdfPCell nameHeader = new PdfPCell(new Paragraph("Travellers", headerFont));
            nameHeader.setBackgroundColor(new Color(64, 64, 64)); // Dark gray
            nameHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            passengerTable.addCell(nameHeader);

            PdfPCell genderHeader = new PdfPCell(new Paragraph("Gender", headerFont));
            genderHeader.setBackgroundColor(new Color(64, 64, 64)); // Dark gray
            genderHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            passengerTable.addCell(genderHeader);

            PdfPCell seatHeader = new PdfPCell(new Paragraph("Seat Number", headerFont));
            seatHeader.setBackgroundColor(new Color(64, 64, 64)); // Dark gray
            seatHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            passengerTable.addCell(seatHeader);

            // Passenger Rows
            for (int i = 0; i < passengers.size(); i++) {
                PdfPCell nameCell = new PdfPCell(new Paragraph(passengers.get(i), normalFont));
                nameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                passengerTable.addCell(nameCell);

                PdfPCell genderCell = new PdfPCell(new Paragraph("Male", normalFont)); // Replace with actual gender
                genderCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                passengerTable.addCell(genderCell);

                PdfPCell seatCell = new PdfPCell(new Paragraph(seatNumbers.get(i).toString(), normalFont));
                seatCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                passengerTable.addCell(seatCell);
            }

            document.add(passengerTable);

            // Add Important Information Section
            document.add(new Paragraph("\n"));
            PdfPTable importantTable = new PdfPTable(1);
            importantTable.setWidthPercentage(100);
            PdfPCell importantHeader = new PdfPCell(new Paragraph("Important Information", subTitleFont));
            importantHeader.setBackgroundColor(new Color(0, 102, 204)); // Blue
            importantHeader.setPadding(5);
            importantHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            importantTable.addCell(importantHeader);

            PdfPCell importantContent = new PdfPCell(new Paragraph(
                "- Please reach the boarding point by the reporting time.\n" +
                "- Chat with us: https://m368j.app.goo.gl/chat\n" +
                "- In case Operator is not reachable please reach out to AbhiBus Customer Support at 040-61656789.",
                normalFont));
            importantContent.setPadding(10);
            importantContent.setHorizontalAlignment(Element.ALIGN_LEFT);
            importantContent.setBorder(Rectangle.NO_BORDER);
            importantTable.addCell(importantContent);

            document.add(importantTable);

            // Add Terms and Conditions Section
            document.add(new Paragraph("\n"));
            PdfPTable termsTable = new PdfPTable(1);
            termsTable.setWidthPercentage(100);
            PdfPCell termsHeader = new PdfPCell(new Paragraph("Terms and Conditions", subTitleFont));
            termsHeader.setBackgroundColor(new Color(0, 102, 204)); // Blue
            termsHeader.setPadding(5);
            termsHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            termsTable.addCell(termsHeader);

            PdfPCell termsContent = new PdfPCell(new Paragraph(
                "• The arrival and departure times mentioned on the ticket are only tentative timings.\n" +
                "• Passengers are requested to arrive at the boarding point at least 15 min. before the scheduled time.\n" +
                "• AbhiBus is not responsible for any accidents or loss of passenger belongings.\n" +
                "• If a bus service is canceled, the refund money is transferred back to the passenger’s Credit/Debit card or Bank Account used for booking.\n" +
                "• Cancellation charges are applicable on Original fare but not on the Discounted Fare.",
                normalFont));
            termsContent.setPadding(10);
            termsContent.setHorizontalAlignment(Element.ALIGN_LEFT);
            termsContent.setBorder(Rectangle.NO_BORDER);
            termsTable.addCell(termsContent);

            document.add(termsTable);

            // Add Cancellation Policy Section
            document.add(new Paragraph("\n"));
            PdfPTable cancellationTable = new PdfPTable(2);
            cancellationTable.setWidthPercentage(100);
            cancellationTable.setWidths(new float[]{2, 1}); // 66% - 33%

            PdfPCell cancelHeader = new PdfPCell(new Paragraph("Cancellation Policy", subTitleFont));
            cancelHeader.setBackgroundColor(new Color(0, 102, 204)); // Blue
            cancelHeader.setPadding(5);
            cancelHeader.setColspan(2);
            cancelHeader.setHorizontalAlignment(Element.ALIGN_CENTER);
            cancellationTable.addCell(cancelHeader);

            PdfPCell timeContent = new PdfPCell(new Paragraph(
                "Cancellation Time\n" +
                "• Before 14-Apr 18:00: 85% refund\n" +
                "• Between 14-Apr 18:00 & 16-Apr 18:00: 70% refund\n" +
                "• Between 16-Apr 18:00 & 17-Apr 18:00: 25% refund\n" +
                "• After 17-Apr 18:00: 5% refund", normalFont));
            timeContent.setPadding(5);
            timeContent.setHorizontalAlignment(Element.ALIGN_LEFT);
            timeContent.setBorder(Rectangle.NO_BORDER);
            cancellationTable.addCell(timeContent);

            PdfPCell refundContent = new PdfPCell(new Paragraph(
                "Refund (%)\n" +
                "85%\n70%\n25%\n5%", normalFont));
            refundContent.setPadding(5);
            refundContent.setHorizontalAlignment(Element.ALIGN_CENTER);
            refundContent.setBorder(Rectangle.NO_BORDER);
            cancellationTable.addCell(refundContent);

            document.add(cancellationTable);

            // Add Footer Section with Tagline
            document.add(new Paragraph("\n"));
            PdfPTable footerTable = new PdfPTable(1);
            footerTable.setWidthPercentage(100);
            PdfPCell footerCell = new PdfPCell(new Paragraph("Proud to be driving India\nLIVE TRACKING | FREE CANCELLATIONS | INSTANT REFUND", subTitleFont));
            footerCell.setBackgroundColor(new Color(204, 0, 0)); // Red
            footerCell.setPadding(10);
            footerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            footerCell.setBorder(Rectangle.NO_BORDER);
            footerTable.addCell(footerCell);

            document.add(footerTable);

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }
}
