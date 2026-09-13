package com.packup.travelers.loader;

import com.packup.travelers.model.TravelMode;
import com.packup.travelers.model.Trip;
import com.packup.travelers.repository.TripRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TripRepository tripRepository;

    public DataSeeder(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    @Override
    public void run(String... args) {
        if (tripRepository.count() > 0) {
            return;
        }

        // ---- TRAINS ----
        tripRepository.save(new Trip(TravelMode.TRAIN, "Coromandel Express", "12841",
                "Chennai", "Kolkata", "08:45", "12:20", "27h 35m",
                new BigDecimal("1450"), 120, 84, 4.3, "AC 3-Tier"));
        tripRepository.save(new Trip(TravelMode.TRAIN, "Chennai-Bengaluru Shatabdi", "12007",
                "Chennai", "Bengaluru", "06:00", "10:50", "4h 50m",
                new BigDecimal("980"), 90, 42, 4.5, "AC Chair Car"));
        tripRepository.save(new Trip(TravelMode.TRAIN, "Rajdhani Express", "12951",
                "Mumbai", "Delhi", "17:00", "08:35", "15h 35m",
                new BigDecimal("2650"), 150, 96, 4.6, "AC 2-Tier"));
        tripRepository.save(new Trip(TravelMode.TRAIN, "Duronto Express", "12213",
                "Delhi", "Hyderabad", "20:05", "23:45", "27h 40m",
                new BigDecimal("1980"), 110, 55, 4.1, "AC 3-Tier"));
        tripRepository.save(new Trip(TravelMode.TRAIN, "Howrah Mail", "12809",
                "Kolkata", "Mumbai", "20:05", "05:35", "33h 30m",
                new BigDecimal("1720"), 100, 61, 3.9, "Sleeper"));
        tripRepository.save(new Trip(TravelMode.TRAIN, "Bengaluru-Hyderabad Express", "17603",
                "Bengaluru", "Hyderabad", "21:15", "09:10", "11h 55m",
                new BigDecimal("890"), 95, 70, 4.0, "Sleeper"));

        // ---- BUSES ----
        tripRepository.save(new Trip(TravelMode.BUS, "PackUp RedLine Volvo", "TN-09-AB-1234",
                "Chennai", "Bengaluru", "22:00", "05:30", "7h 30m",
                new BigDecimal("850"), 40, 18, 4.4, "AC Sleeper"));
        tripRepository.save(new Trip(TravelMode.BUS, "Orange Travels", "KA-05-CD-5678",
                "Bengaluru", "Hyderabad", "21:30", "07:00", "9h 30m",
                new BigDecimal("1100"), 36, 22, 4.2, "AC Seater/Sleeper"));
        tripRepository.save(new Trip(TravelMode.BUS, "VRL Travels", "MH-12-EF-9012",
                "Mumbai", "Pune", "07:00", "10:30", "3h 30m",
                new BigDecimal("450"), 45, 30, 4.0, "Non-AC Seater"));
        tripRepository.save(new Trip(TravelMode.BUS, "SRS Travels", "AP-10-GH-3456",
                "Hyderabad", "Chennai", "23:00", "09:30", "10h 30m",
                new BigDecimal("1250"), 38, 14, 4.3, "AC Sleeper"));
        tripRepository.save(new Trip(TravelMode.BUS, "Kallada Travels", "KL-07-IJ-7890",
                "Kochi", "Bengaluru", "18:45", "06:15", "11h 30m",
                new BigDecimal("1350"), 32, 9, 4.1, "AC Multi-Axle Sleeper"));
        tripRepository.save(new Trip(TravelMode.BUS, "Greenline Travels", "DL-01-KL-2345",
                "Delhi", "Jaipur", "06:15", "11:45", "5h 30m",
                new BigDecimal("650"), 42, 33, 3.8, "AC Seater"));

        // ---- FLIGHTS ----
        tripRepository.save(new Trip(TravelMode.FLIGHT, "IndiGo", "6E-204",
                "Chennai", "Delhi", "06:20", "09:05", "2h 45m",
                new BigDecimal("4899"), 180, 112, 4.2, "Economy"));
        tripRepository.save(new Trip(TravelMode.FLIGHT, "Air India", "AI-440",
                "Mumbai", "Bengaluru", "11:15", "12:45", "1h 30m",
                new BigDecimal("3599"), 160, 88, 4.0, "Economy"));
        tripRepository.save(new Trip(TravelMode.FLIGHT, "Vistara", "UK-815",
                "Delhi", "Kolkata", "14:00", "16:20", "2h 20m",
                new BigDecimal("5299"), 150, 64, 4.5, "Premium Economy"));
        tripRepository.save(new Trip(TravelMode.FLIGHT, "SpiceJet", "SG-108",
                "Hyderabad", "Mumbai", "18:30", "20:00", "1h 30m",
                new BigDecimal("3899"), 174, 140, 3.9, "Economy"));
        tripRepository.save(new Trip(TravelMode.FLIGHT, "IndiGo", "6E-671",
                "Bengaluru", "Chennai", "09:10", "10:15", "1h 5m",
                new BigDecimal("2799"), 180, 155, 4.1, "Economy"));
        tripRepository.save(new Trip(TravelMode.FLIGHT, "Air India", "AI-661",
                "Kolkata", "Chennai", "16:40", "19:05", "2h 25m",
                new BigDecimal("4599"), 160, 77, 4.0, "Economy"));
    }
}
