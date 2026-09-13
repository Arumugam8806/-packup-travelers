package com.packup.travelers.service;

import com.packup.travelers.model.TravelMode;
import com.packup.travelers.model.Trip;
import com.packup.travelers.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;

    @Autowired
    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> search(TravelMode mode, String source, String destination) {
        return tripRepository.search(mode, blankToNull(source), blankToNull(destination));
    }

    public List<Trip> findByMode(TravelMode mode) {
        return tripRepository.findByMode(mode);
    }

    public Optional<Trip> findById(Long id) {
        return tripRepository.findById(id);
    }

    public List<String> allSources() {
        return tripRepository.findDistinctSources();
    }

    public List<String> allDestinations() {
        return tripRepository.findDistinctDestinations();
    }

    private String blankToNull(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value.trim();
    }
}
