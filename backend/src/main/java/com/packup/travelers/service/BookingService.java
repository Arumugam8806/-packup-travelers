package com.packup.travelers.service;

import com.packup.travelers.dto.BookingRequest;
import com.packup.travelers.model.Booking;
import com.packup.travelers.model.Trip;
import com.packup.travelers.repository.BookingRepository;
import com.packup.travelers.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BookingService {

    private static final BigDecimal TAX_RATE = new BigDecimal("0.05"); // 5% GST
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final String ALPHANUMERIC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    private final BookingRepository bookingRepository;
    private final TripRepository tripRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, TripRepository tripRepository) {
        this.bookingRepository = bookingRepository;
        this.tripRepository = tripRepository;
    }

    public Booking createBooking(BookingRequest request) {
        Trip trip = tripRepository.findById(request.getTripId())
                .orElseThrow(() -> new NoSuchElementException("Trip not found with id " + request.getTripId()));

        if (trip.getAvailableSeats() < request.getNumberOfTickets()) {
            throw new IllegalStateException("Only " + trip.getAvailableSeats() + " seat(s) left on this " +
                    trip.getMode().name().toLowerCase());
        }

        BigDecimal farePerTicket = trip.getPrice();
        BigDecimal subTotal = farePerTicket.multiply(BigDecimal.valueOf(request.getNumberOfTickets()));
        BigDecimal tax = subTotal.multiply(TAX_RATE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = subTotal.add(tax).setScale(2, RoundingMode.HALF_UP);

        Booking booking = new Booking();
        booking.setPnr(generatePnr());
        booking.setTripId(trip.getId());
        booking.setMode(trip.getMode());
        booking.setOperatorName(trip.getOperatorName());
        booking.setSource(trip.getSource());
        booking.setDestination(trip.getDestination());
        booking.setDepartureTime(trip.getDepartureTime());
        booking.setArrivalTime(trip.getArrivalTime());
        booking.setTravelDate(request.getTravelDate());
        booking.setPassengerName(request.getPassengerName());
        booking.setEmail(request.getEmail());
        booking.setPhone(request.getPhone());
        booking.setNumberOfTickets(request.getNumberOfTickets());
        booking.setFarePerTicket(farePerTicket.setScale(2, RoundingMode.HALF_UP));
        booking.setTaxAmount(tax);
        booking.setTotalFare(total);
        booking.setStatus("CONFIRMED");
        booking.setBookedAt(LocalDateTime.now());

        trip.setAvailableSeats(trip.getAvailableSeats() - request.getNumberOfTickets());
        tripRepository.save(trip);

        return bookingRepository.save(booking);
    }

    public Optional<Booking> findByPnr(String pnr) {
        return bookingRepository.findByPnr(pnr);
    }

    private String generatePnr() {
        StringBuilder sb = new StringBuilder("PKT");
        for (int i = 0; i < 7; i++) {
            sb.append(ALPHANUMERIC.charAt(RANDOM.nextInt(ALPHANUMERIC.length())));
        }
        return sb.toString();
    }
}
